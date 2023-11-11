import { useEffect, useState } from "react";
import "./employeehardwareinfos.scss";
import httpModule from "../../helpers/http.module";
import { IEmployeeHardwareInfo } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EmployeeHardwareInfosGrid from "../../components/employeehardwareinfo/EmployeeHardwareInfosGrid.components";

const EmployeeHardwareInfos = () => {
  const [employeehardwareinfos, setEmployeeHardwareInfos] = useState<IEmployeeHardwareInfo[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IEmployeeHardwareInfo[]>("/EmployeeHardwareInfo/Get")
      .then((response) => {
        setEmployeeHardwareInfos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content employeehardwareinfos">
      <div className="heading">
        <h2>EmployeeHardwareInfos</h2>
        <Button
          variant="outlined"
          onClick={() => redirect("/employeehardwareinfos/add")}>
        
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : employeehardwareinfos.length === 0 ? (
        <h1>Loading Inventory</h1>
      ) : (
        <EmployeeHardwareInfosGrid data={employeehardwareinfos} />
      )}
    </div>
  );
};

export default EmployeeHardwareInfos;
