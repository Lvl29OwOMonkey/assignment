import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface TableComponentProps {
	data: any[]; // Replace 'any[]' with the actual type of your data
}

const columns: GridColDef[] = [
	{ field: "title", headerName: "Title", flex: 1 },
	{ field: "authors", headerName: "Authors", flex: 1 },
	{ field: "articleSource", headerName: "Article Source", flex: 1 },
	{ field: "evidenceResult", headerName: "Evidence Result", flex: 1 },
	{ field: "yearOfPub", headerName: "Year of Publication", flex: 1 },
	{ field: "journalConfName", headerName: "Journal/Conf Name", flex: 1 },
	{ field: "sePractice", headerName: "SE Practice", flex: 1 },
	{ field: "resultOfEvidence", headerName: "Result of Evidence", flex: 1 },
	{ field: "typeOfResearch", headerName: "Type of Research", flex: 1 },
	{ field: "typeOfParticipant", headerName: "Type of Participant", flex: 1 },
	{ field: "averageRating", headerName: "Average Rating", flex: 1 },
];

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
	return (
		<div style={{ height: 400, width: "100%" }}>
			<DataGrid rows={data} columns={columns} checkboxSelection />
		</div>
	);
};

export default TableComponent;
