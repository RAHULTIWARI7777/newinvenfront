import { useEffect, useState } from "react";
import "./employees.scss";
import httpModule from "../../helpers/http.module";
import { IEmployee } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EmployeesGrid from "../../components/employees/EmployeesGrid.components";
import saveAs from "file-saver";



const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IEmployee[]>("/Employee/Get")
      .then((response) => {
        setEmployees(response.data);
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
      .get("/Employee/DownloadExcel", { responseType: "blob" })
      .then((response) => {
        saveAs(response.data, "Employees.xlsx");
      })
      .catch((error) => {
        console.error("Error downloading Excel file:", error);
      });
  };



  //console.log(employees);
  return (
    <div className="content employees">
      <div className="heading">
        <h2>Employees</h2>
        <Button variant="outlined" onClick={() => redirect("/employees/add")}>
          <Add />
        </Button>
        <Button variant="outlined" onClick={downloadExcel}>
          Download Excel
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : employees.length === 0 ? (
        <h1>Loading Employees</h1>
      ) : (
        <EmployeesGrid data={employees} />
      )}
    </div>
  );
};

export default Employees;
