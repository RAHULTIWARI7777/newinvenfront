import { useState, useEffect } from "react";
import "./employeehardwareinfos.scss";
import {
  IEmployee,
  ICreateEmployeeDto,
  IHardwareInfo,
  ICreateHardwareInfoDto,
  ICreateEmployeeHardwareInfoDto,
} from "../../types/global.typing";

import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddEmployeeHardwareInfo = () => {
  const [employeehardwareinfo, setEmployeeHardwareInfo] =
    useState<ICreateEmployeeHardwareInfoDto>({
      remarks: "",

      employeeId: "",
      hardwareInfoId: "",
    });

  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<IEmployee[]>("/Employee/Get")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const [hardwareinfos, setHardwareInfos] = useState<IHardwareInfo[]>([]);

  useEffect(() => {
    httpModule
      .get<IHardwareInfo[]>("/HardwareInfo/Get")
      .then((response) => {
        setHardwareInfos(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

    const handleClickSaveBtn = () => {
      if (employeehardwareinfo.remarks === ""|| employeehardwareinfo.employeeId === ""|| employeehardwareinfo.hardwareInfoId === "") {
        alert("Fill all fields");
        return;
      }
      httpModule
        .post("/EmployeeHardwareInfo/Create", employeehardwareinfo)
        .then((responst) => redirect("/employeehardwareinfos"))
        .catch((error) => console.log(error));
    };

  const handleClickBackBtn = () => {
    redirect("/employeehardwareinfos");
  };

  return (
    <div className="content">
      <div className="add-employeehardwareinfo">
        <h2>Add New Inventory</h2>
        <TextField
          autoComplete="off"
          label=" Remarks "
          variant="outlined"
          value={employeehardwareinfo.remarks}
          onChange={(e) => setEmployeeHardwareInfo({ ...employeehardwareinfo, remarks: e.target.value })}
        />

    
        <FormControl fullWidth>
          <InputLabel>Employee</InputLabel>
          <Select
            value={employeehardwareinfo.employeeId}
            label="Employee"
            onChange={(e) => setEmployeeHardwareInfo({ ...employeehardwareinfo, employeeId: e.target.value })}
          >
            {employees.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>HardwareInfo</InputLabel>
          <Select
            value={employeehardwareinfo.hardwareInfoId}
            label="HardwareInfo"
            onChange={(e) => setEmployeeHardwareInfo({ ...employeehardwareinfo, hardwareInfoId: e.target.value })}
          >
            {hardwareinfos.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>





        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeHardwareInfo;
