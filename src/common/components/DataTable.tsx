import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DataTable = () => {
    const columnDefs: ColDef[] = [
        { field: "make", headerName: "Make" },
        { field: "model", headerName: "Model" },
        { field: "price", headerName: "Price" },
    ];

    const rowData = [
        { make: "Toyota", model: "Corolla", price: 25000 },
        { make: "Ford", model: "Focus", price: 23000 },
        { make: "Tesla", model: "Model 3", price: 50000 },
    ];

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact rowData={rowData} columnDefs={columnDefs} />
        </div>
    );
};

export default DataTable;
