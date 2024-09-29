import React, { useCallback } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button } from "@nextui-org/react";

const RegionSelector = ({ region, setRegion }) => {
    const regions = ["Mexico", "USA", "France"];

    const handleSelectionChange = useCallback(
        (keys) => {
            const selectedRegion = Array.from(keys)[0];
            setRegion(selectedRegion);
        },
        [setRegion]
    );

    return (
        <div className="flex flex-row gap-3 items-center">
            <h2 className="w-16">Region</h2>
            <Dropdown>
                <DropdownTrigger className="w-32 bg-blue-700">
                    <Button>{region}</Button>
                </DropdownTrigger>
                <DropdownMenu selectionMode="single" selectedKeys={region} onSelectionChange={handleSelectionChange}>
                    {regions.map((r) => (
                        <DropdownItem key={r}>{r}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default React.memo(RegionSelector);
