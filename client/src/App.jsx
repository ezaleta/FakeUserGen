import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useDebounce } from "use-debounce";
import RegionSelector from "./components/RegionSelector";
import ErrorControl from "./components/ErrorControl";
import SeedInput from "./components/SeedInput";
import DataTable from "./components/DataTable";
import ExportButton from "./components/ExportButton";
import seedrandom from "seedrandom";

function App() {
    const [region, setRegion] = useState("USA");
    const [errorsPerRecord, setErrorsPerRecord] = useState(0);
    const [debouncedErrorsPerRecord] = useDebounce(errorsPerRecord, 100);
    const [seed, setSeed] = useState(1234567);
    const [baseData, setBaseData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef(false);

    const fetchData = useCallback(
        async (pageToFetch) => {
            if (loadingRef.current) return;
            loadingRef.current = true;
            try {
                const response = await fetch(`/api/generate?region=${encodeURIComponent(region)}&seed=${seed}&page=${pageToFetch}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const newData = await response.json();

                if (newData.length === 0) {
                    setHasMore(false);
                } else {
                    setBaseData((prevData) => (pageToFetch === 1 ? newData : [...prevData, ...newData]));
                    setPage(pageToFetch + 1);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setHasMore(false);
            } finally {
                loadingRef.current = false;
            }
        },
        [region, seed]
    );

    const fetchMoreData = useCallback(() => {
        fetchData(page);
    }, [fetchData, page]);

    useEffect(() => {
        setBaseData([]);
        setPage(1);
        setHasMore(true);
        loadingRef.current = false;
        fetchData(1);
    }, [region, seed]);

    const dataWithErrors = useMemo(() => {
        if (debouncedErrorsPerRecord === 0) {
            return baseData;
        }

        const rng = seedrandom(`${seed}-${debouncedErrorsPerRecord}`);

        const applyRandomError = (record) => {
            const fields = ["name", "address", "city", "phone"];
            const field = fields[Math.floor(rng() * fields.length)];
            const errorType = Math.floor(rng() * 3);

            let value = record[field];

            switch (errorType) {
                case 0:
                    value = deleteRandomCharacter(value, rng);
                    break;
                case 1:
                    value = addRandomCharacter(value, rng);
                    break;
                case 2:
                    value = swapAdjacentCharacters(value, rng);
                    break;
                default:
                    break;
            }

            return {
                ...record,
                [field]: value,
            };
        };

        const deleteRandomCharacter = (str, rng) => {
            if (str.length === 0) return str;
            const index = Math.floor(rng() * str.length);
            return str.slice(0, index) + str.slice(index + 1);
        };

        const addRandomCharacter = (str, rng) => {
            const index = Math.floor(rng() * (str.length + 1));
            const char = String.fromCharCode(Math.floor(rng() * 26) + 97); // a-z
            return str.slice(0, index) + char + str.slice(index);
        };

        const swapAdjacentCharacters = (str, rng) => {
            if (str.length < 2) return str;
            const index = Math.floor(rng() * (str.length - 1));
            return str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2);
        };

        const applyErrorsToData = (data) => {
            return data.map((record) => {
                let newRecord = { ...record };
                const errorCount = debouncedErrorsPerRecord;
                const maxErrors = Math.floor(errorCount);
                const additionalErrorProbability = errorCount - maxErrors;
                let totalErrors = maxErrors;

                if (rng() < additionalErrorProbability) {
                    totalErrors += 1;
                }

                for (let i = 0; i < totalErrors; i++) {
                    newRecord = applyRandomError(newRecord);
                }

                return newRecord;
            });
        };

        return applyErrorsToData(baseData);
    }, [baseData, debouncedErrorsPerRecord, seed]);

    return (
        <main className="dark text-foreground max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold text-center mb-10">Fake User Data Generator</h1>
            <div className="flex flex-row justify-between gap-6 mb-10">
                <RegionSelector region={region} setRegion={setRegion} />
                <ErrorControl errorsPerRecord={errorsPerRecord} setErrorsPerRecord={setErrorsPerRecord} />
                <SeedInput seed={seed} setSeed={setSeed} />
            </div>
            <DataTable data={dataWithErrors} fetchMoreData={fetchMoreData} hasMore={hasMore} />
            <ExportButton data={dataWithErrors} />
        </main>
    );
}

export default App;
