import "./employees-grid.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";

import React from "react";
import { IEmployee } from "../../types/global.typing";
import moment from "moment";





const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },

  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
  }, 
];

interface IEmployeesGridProps {
  data: IEmployee[];
}

const EmployeesGrid = ({ data }: IEmployeesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="employees-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};
export default EmployeesGrid;
