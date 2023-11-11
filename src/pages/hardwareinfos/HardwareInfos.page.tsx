import { useEffect, useState } from "react";
import "./hardwareinfos.scss";
import httpModule from "../../helpers/http.module";
import { IHardwareInfo } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import HardwareInfosGrid from "../../components/hardwareinfos/HardwareInfosGrid.components";
import saveAs from "file-saver";


const HardwareInfos = () => {
  const [hardwareinfos, setHardwareInfos] = useState<IHardwareInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IHardwareInfo[]>("/HardwareInfo/Get")
      .then((response) => {
        setHardwareInfos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);


  
  const downloadExcel = () => {
    httpModule
      .get("/HardwareInfo/DownloadExcel", { responseType: "blob" })
      .then((response) => {
        saveAs(response.data, "HardwareInfos.xlsx");
      })
      .catch((error) => {
        console.error("Error downloading Excel file:", error);
      });
  };








  return (
    <div className="content hardwareinfos">
      <div className="heading">
        <h2>HardwareInfos</h2>
        <Button
          variant="outlined"
          onClick={() => redirect("/hardwareinfos/add")}
        >
          <Add />
        </Button>
        <Button variant="outlined" onClick={downloadExcel}>
          Download Excel
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : hardwareinfos.length === 0 ? (
        <h1>Loading HardwareInfo</h1>
      ) : (
        <HardwareInfosGrid data={hardwareinfos} />
      )}
    </div>
  );
};

export default HardwareInfos;
