import { AgGridReact } from "ag-grid-react";
import { ColDef, GridOptions, GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useNavigate } from "react-router-dom";

interface DataTableProps<T> {
    columns: ColDef<T>[];
    data: T[];
    className?: string;
}

const DataTable = <T,>({ columns, data, className = "" }: DataTableProps<T>) => {
    const navigate = useNavigate();

    const gridOptions: GridOptions<T> = {
        rowStyle: { background: "#fff" },
        getRowStyle: (params) => {
            if (params.node.rowIndex && params.node.rowIndex !== undefined && params.node.rowIndex % 2 === 0) {
                return { background: "#DEECFB" };
            } else if (params.node.rowIndex === 0) {
                return { background: "#DEECFB" };
            }
            return { background: "#fff" };
        },
    };

    const onRowClicked = (event: RowClickedEvent) => {
        if (!event.data) return;
        const group_id = event.data.group_id;
        const group_name = event.data.group_name;

        navigate(`/edit/${group_name}/${group_id}`);
    };


    const onGridReady = (params: GridReadyEvent) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <div className={`ag-theme-material ${className}`} style={{ height: 600, width: "100%", overflow: "auto" }}>
            <AgGridReact
                rowData={data}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={20}
                gridOptions={gridOptions}
                onGridReady={onGridReady}
                onRowClicked={onRowClicked}
                domLayout="autoHeight"
                headerHeight={40}
                rowHeight={25}
            />
        </div>
    );
};

export default DataTable;
