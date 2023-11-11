

export interface IEmployee {
    name:string;
    id : string;
    createdAt : string;

}

export interface ICreateEmployeeDto {
    name:string;
    
}















export interface IHardwareInfo {
    type:string;
    id : string;
    createdAt : string;

}

export interface ICreateHardwareInfoDto {
    type:string;
    
}








export interface IEmployeeHardwareInfo {
    remarks : string
    id : string
    createdAt : string
    employeeId : string
    employeeName : string
    hardwareInfoId : string
    hardwareInfoType : string


}

export interface ICreateEmployeeHardwareInfoDto {
    remarks : string
   
    employeeId : string
    
    hardwareInfoId : string
    


}



	

// [
//   {
//     "remarks": "first one",
//     "id": 1,
//     "createdAt": "2023-11-06T16:52:49.6999645",
//     "employeeId": 1,
//     "employeeName": "batman",
//     "hardwareInfoId": 1,
//     "hardwareInfoType": "Server"
//   }




// {
//     "type": "Server",
//     "id": 3,
//     "createdAt": "2023-11-06T15:35:28.7525069"
//   },


// {
//     "name": "ashish bhai",
//     "id": 8,
//     "createdAt": "2023-11-06T15:35:52.7550298"
//   },