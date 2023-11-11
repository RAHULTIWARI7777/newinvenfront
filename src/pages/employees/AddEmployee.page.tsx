import { useState } from "react";
import { ICreateEmployeeDto } from "../../types/global.typing";
import {} from "@mui/material";
import TextField from "@mui/material/TextField/TextField";

import Button from "@mui/material/Button/Button";

import httpModule from "../../helpers/http.module";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState<ICreateEmployeeDto>({ name: " " });
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const redirect = useNavigate();


  
  const handleClickSaveBtn = () => {
    // if (employee.name === "") {
    //   alert("Fill all fields");
    //   return;
    // }
    httpModule
      .post("/Employee/Create", employee)
      .then((responst) => redirect("/employees"))
      .catch((error) => console.log(error));
  };
 
  const handleClickBackBtn = () => {
    redirect("/employees");
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
      .post("Employee/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      


      .then((response) => {
        // After a successful upload, you can handle the response
        // This might include a redirect or displaying a success message
        // For example, redirect to the employee page
        redirect("/employees");
        console.log("Response:", response);
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred while processing the Excel file.");
      });
  };
  console.log(handleClicksSaveBtn , "letsee")



  return (
    <div>
    <div className="content">
      <div className="add-employee">
        <h2>Add New Employee</h2>
        <TextField
          autoComplete="off"
          label="Employee Name"
          variant="outlined"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        />
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClickBackBtn}>
                  Back
          </Button>
        </div>
      </div>
    </div>
    <div className="content">
      <div className="add-employee">
        <h2>Add Excel</h2>
        {/* <TextField
          autoComplete="off"
          label="Employee Name"
          variant="outlined"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        /> */}


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

export default AddEmployee;
