import "./hardwareinfos-grid.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";

import React from "react";
import { IHardwareInfo } from "../../types/global.typing";
import moment from "moment";





const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "type", headerName: "Type", width: 200 },

  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
  }, 
];

interface IHardwareInfosGridProps {
  data: IHardwareInfo[];
}

const HardwareInfosGrid = ({ data }: IHardwareInfosGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="hardwareinfos-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};
export default HardwareInfosGrid;