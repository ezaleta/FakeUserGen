import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const DataTable = ({ data, fetchMoreData, hasMore }) => {
    const columns = [
        { key: "index", label: "Index" },
        { key: "identifier", label: "Identifier" },
        { key: "name", label: "Name" },
        { key: "address", label: "Address" },
        { key: "city", label: "City" },
        { key: "phone", label: "Phone" },
    ];

    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p className="text-center">
                    <b>No more data</b>
                </p>
            }
            height={640}
        >
            <Table aria-label="Generated Data Table" selectionMode="none" layout="auto" className="min-w-full">
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={`${item.index}-${item.identifier}`}>
                            <TableCell width={25}>{item.index}</TableCell>
                            <TableCell width={200}>{item.identifier}</TableCell>
                            <TableCell width={260}>{item.name}</TableCell>
                            <TableCell width={400}>{item.address}</TableCell>
                            <TableCell width={150}>{item.city}</TableCell>
                            <TableCell width={150}>{item.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </InfiniteScroll>
    );
};

export default DataTable;
