import "./employeehardwareinfos-grid.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import React from "react";
import { IEmployeeHardwareInfo } from "../../types/global.typing";
import EmployeeHardwareInfos from "../../pages/employeehardwareinfos/EmployeeHardwareInfos.page";

const column: GridColDef[] = [
   { field: "id", headerName: "ID", width: 100 },
   { field: "employeeName", headerName: "Employee Name", width: 150 },
   { field: "hardwareInfoType", headerName: "HardwareInfo Type", width: 150 },
   {field: "remarks", headerName: "Remarks", width: 150 },
   {
      field: "createdAt",
      headerName: "Creation Time",
      width: 150,
      renderCell: (params) => moment(params.row.createdAt).fromNow(),
   },
];

interface IEmployeeHardwareInfosGridProps {
   data: IEmployeeHardwareInfo[];
}

const EmployeeHardwareInfosGrid = ({ data }: IEmployeeHardwareInfosGridProps) => {
   return (
      <Box sx={{ width: "100%", height: 450 }} className="employeehardwareinfos-grid">
         <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50} />
      </Box>
   );
};

export default EmployeeHardwareInfosGrid;
