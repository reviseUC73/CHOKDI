import axios from "axios";
// require("dotenv").config(); // Load environment variables from .env file

const port = 3001;
const host_ip = 'localhost';


export const AllInformation = async () => {
    const baseURL = `http://${host_ip}:${port}/read`;
  
    try {
      const response = await axios.get(baseURL);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      return null;
    }
  };
  