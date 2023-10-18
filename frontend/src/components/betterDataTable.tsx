import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
	{ field: "title", headerName: "Title" },
	{ field: "authors", headerName: "Authors" },
	{ field: "source", headerName: "Source" },
	{ field: "pubYear", headerName: "Publication Year" },
	{ field: "doi", headerName: "DOI" },
	{ field: "claim", headerName: "Claim" },
	{ field: "evidence", headerName: "Evidence" },
];

interface DataTableProps {
	rows: any[]; // Change the type to match your data structure
}

const BetterDataTable: React.FC<DataTableProps> = ({ rows }) => {
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
			{/* <TableHead>
				<TableRow>
					{columns.map((column) => (
						<TableCell
							key={column.field}
							classes={{ root: "text-white font-bold" }}
						>
							<TableSortLabel
								active={true}
								direction="asc"
								sx={{
									"& .MuiTableSortLabel-icon": { color: "white !important" },
                  "& .MuiTableSortLabel-root": { color: "white !important" },
								}}
								// onClick={createSortHandler(column.field)}
							>
								{column.headerName}
							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			</TableHead> */}
		</div>
	);
};

export default BetterDataTable;
