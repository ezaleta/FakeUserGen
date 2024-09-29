import React, { useCallback } from "react";
import { Input, Button } from "@nextui-org/react";
import seedrandom from "seedrandom";

const SeedInput = ({ seed, setSeed }) => {
    const generateRandomSeed = useCallback(() => {
        const rng = seedrandom();
        const randomSeed = Math.floor(rng() * 10000000);
        setSeed(randomSeed);
    }, [setSeed]);

    const handleInputChange = useCallback(
        (e) => {
            const value = e.target.value.replace(/\D/g, "");
            setSeed(value);
        },
        [setSeed]
    );

    return (
        <div className="flex flex-row gap-3 items-center">
            <h2 className="w-24">Seed Value</h2>
            <Input aria-label="Seed Value" value={seed} onChange={handleInputChange} className="w-24" />
            <Button onPress={generateRandomSeed} className="w-28 bg-blue-700">
                Randomize
            </Button>
        </div>
    );
};

export default React.memo(SeedInput);
