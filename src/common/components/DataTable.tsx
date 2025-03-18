import { AgGridReact } from "ag-grid-react";
import { GridOptions, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { DataTableProps } from "../models/DataTableProps";

const DataTable = <T,>({ columns, data, className = "", onRowClick }: DataTableProps<T>) => {

    const gridOptions: GridOptions<T> = {
        suppressCellFocus: true,
        suppressRowClickSelection: true,
        rowSelection: "single",
        rowStyle: { background: "#fff" },
        getRowStyle: (params) => {
            if (params.node.rowIndex && params.node.rowIndex !== undefined && params.node.rowIndex % 2 === 0) {
                return { background: "#e8e8e8" };
            } else if (params.node.rowIndex === 0) {
                return { background: "#e8e8e8" };
            }
            return { background: "#fff" };
        },
    };

    const onGridReady = (params: GridReadyEvent) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <div className={`ag-theme-material ${className}`} style={{ height: 600, width: "100%", overflow: "auto", fontFamily: "Roboto, sans-serif" }}>
            <AgGridReact
                rowData={data}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={20}
                gridOptions={gridOptions}
                onGridReady={onGridReady}
                onRowClicked={onRowClick}
                domLayout="autoHeight"
                headerHeight={40}
                rowHeight={25}
            />
        </div>
    );
};

export default DataTable;
