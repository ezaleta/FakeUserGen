const fetchMoreData = async () => {
    try {
        const response = await fetch(`/api/generate?region=${encodeURIComponent(region)}&errorsPerRecord=${errorsPerRecord}&seed=${seed}&page=${page}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const newData = await response.json();

        if (newData.length === 0) {
            setHasMore(false);
        } else {
            setData((prevData) => [...prevData, ...newData]);
            setPage((prevPage) => prevPage + 1);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        setHasMore(false);
    }
};
