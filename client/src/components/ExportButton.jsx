import React from "react";
import { Button } from "@nextui-org/react";

const ExportButton = ({ data }) => {
    const exportToCSV = async () => {
        try {
            const response = await fetch("${API_BASE_URL}/api/export", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data }),
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "data.csv";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("Error exporting data: ", error);
        }
    };

    return (
        <div className="flex justify-end mt-5">
            <Button onPress={exportToCSV} className="w-32 bg-blue-700">
                Export to CSV
            </Button>
        </div>
    );
};

export default ExportButton;
