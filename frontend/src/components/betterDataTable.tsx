import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'author', headerName: 'Authors', width: 130 },
  { field: 'source', headerName: 'Article Source', width: 130 },
  { field: 'result', headerName: 'Evidence Result', width: 130 },
  { field: 'publication_Year', headerName: 'Publication Year', width: 130 },
  { field: 'journal_name', headerName: 'Journal/Conference Name', width: 130 },
  { field: 'se_practice', headerName: 'Software Engineering Practice', width: 130 },
  { field: 'research_type', headerName: 'Research Type', width: 130 },
  { field: 'participant', headerName: 'Participant Type', width: 130 },
  { field: 'rating', headerName: 'Average Rating', width: 130 },
];

interface DataTableProps {
  rows: any[]; // Change the type to match your data structure
}

const betterDataTable: React.FC<DataTableProps> = ({ rows }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default betterDataTable;
