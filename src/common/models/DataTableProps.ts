import { ColDef, RowClickedEvent } from "ag-grid-community";

export interface DataTableProps<T> {
    columns: ColDef<T>[];
    data: T[];
    className?: string;
    onRowClick?: (event: RowClickedEvent<T>) => void; 
}
