import { useState, useEffect } from "react";
import "./hardwareinfos.scss";
import { ICreateHardwareInfoDto } from "../../types/global.typing";

import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddHardwareInfo = () => {
  const [hardwareinfo, setHardwareInfo] = useState<ICreateHardwareInfoDto>({
    type: "",
  });
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    // if (hardwareinfo.type === "") {
    //   alert("Fill all fields");
    //   return;
    // }
    httpModule
      .post("/HardwareInfo/Create", hardwareinfo)
      .then((responst) => redirect("/hardwareinfos"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/hardwareinfos");
  };



  const handleClicksSaveBtn = () => {
    // Check if a file is selected
  
  if (!selectedFile) {
    alert("Please select a file.");
    return;
  }

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append("file", selectedFile);

   // Log the FormData object to the console
console.log("FormData:", formData);


  // Send a POST request to the /upload endpoint in your .NET backend
  httpModule
    .post("HardwareInfo/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    


    .then((response) => {
      // After a successful upload, you can handle the response
      // This might include a redirect or displaying a success message
      // For example, redirect to the employee page
      redirect("/hardwareinfos");
      console.log("Response:", response);
    })
    .catch((error) => {
      console.log(error);
      alert("An error occurred while processing the Excel file.");
    });
};



  return (
    <div>
    <div className="content">
      <div className="add-Hardware">
        <h2>Add New HardwareInfo</h2>
        <FormControl fullWidth>
          <InputLabel>HardwareInfo Type</InputLabel>
          <Select
            value={hardwareinfo.type}
            label="HardwareInfo Type"
            onChange={(e) =>
              setHardwareInfo({ ...hardwareinfo, type: e.target.value })
            }
          >
            <MenuItem value="Laptop">Laptop</MenuItem>
            <MenuItem value="Desktop">Desktop</MenuItem>
            <MenuItem value="Server">Server</MenuItem>
            <MenuItem value="Printer">Printer</MenuItem>
            <MenuItem value="Scanner">Scanner</MenuItem>
            <MenuItem value="Monitor">Monitor</MenuItem>
            <MenuItem value="Mouse">Mouse</MenuItem>
            <MenuItem value="Keyboard">Keyboard</MenuItem>
            <MenuItem value="MobilePhone">Mobile Phone</MenuItem>
            <MenuItem value="Tablet">Tablet</MenuItem>
            <MenuItem value="NetworkSwitch">Network Switch</MenuItem>
            <MenuItem value="NetworkRouter">Network Router</MenuItem>
            <MenuItem value="ExternalHardDrive">External Hard Drive</MenuItem>
            <MenuItem value="Projector">Projector</MenuItem>
            <MenuItem value="AudioEquipment">Audio Equipment</MenuItem>
            <MenuItem value="VideoEquipment">Video Equipment</MenuItem>
            <MenuItem value="Camera">Camera</MenuItem>
            <MenuItem value="Workstation">Workstation</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
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
    <div className="content">
    <div className="add-Hardware">
      <h2>Add Excel</h2>
      <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files?.[0])}
        />
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            
            onClick={handleClicksSaveBtn}
          >
            Saves
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClickBackBtn}>
                  Back
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddHardwareInfo;
