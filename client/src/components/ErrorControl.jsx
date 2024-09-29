import React, { useCallback } from "react";
import { Input, Slider } from "@nextui-org/react";

const ErrorControl = ({ errorsPerRecord, setErrorsPerRecord }) => {
    const maxValue = 10;
    const minValue = 0;
    const step = 0.1;

    const handleSliderChange = useCallback(
        (value) => {
            setErrorsPerRecord(value);
        },
        [setErrorsPerRecord]
    );

    const handleInputChange = useCallback(
        (e) => {
            const value = parseFloat(e.target.value);
            if (value === "") {
                setErrorsPerRecord(0);
                return;
            }
            if (!isNaN(value) && value >= minValue) {
                setErrorsPerRecord(value);
            }
        },
        [setErrorsPerRecord, minValue, maxValue]
    );

    return (
        <div className="flex flex-row gap-3 items-center">
            <h2 className="w-34">Errors</h2>
            <Input
                aria-label="Errors per Record"
                type="number"
                min={minValue}
                step={step}
                value={errorsPerRecord}
                onChange={handleInputChange}
                className="w-60"
                endContent={<Slider aria-label="Errors per Record" minValue={minValue} maxValue={maxValue} step={step} value={errorsPerRecord} onChange={handleSliderChange} showTooltip={true} className="w-96" />}
            />
        </div>
    );
};

export default React.memo(ErrorControl);
