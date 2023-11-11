import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../constants/url.constants";
import { saveAs } from "file-saver";

const httpModule = axios.create({
  baseURL: baseUrl,
});

// Interceptor for handling binary responses (e.g., file downloads)
httpModule.interceptors.response.use(
  (response: AxiosResponse) => {
    // Check if the response is a blob
    if (response.headers["content-type"]?.includes("application/octet-stream")) {
      const fileName = response.headers["content-disposition"]?.split("filename=")[1];
      if (fileName) {
        saveAs(new Blob([response.data]), fileName);
      }
    }
    return response;
  },
   


  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }



 
 
 










);



















export default httpModule;
