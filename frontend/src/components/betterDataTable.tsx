import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataTableProps {
	columns: GridColDef[];
	rows: any[]; // Change the type to match your data structure
}

const BetterDataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
	columns.forEach((column) => {
		column.flex = 1;
	});
	rows.map((row, i) => {
		row.id = i;
	});
	return (
		<div>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				sx={{
					"& .MuiSvgIcon-root": { color: "white !important" },
					"& .MuiTablePagination-root": { color: "white !important" },
				}}
				classes={{
					row: "text-white",
					columnHeader: "text-white",
					menuIconButton: "text-white",
				}}
			/>
		</div>
	);
};

export default BetterDataTable;
