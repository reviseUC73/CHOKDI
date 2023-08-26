import axios from "axios";
// require("dotenv").config(); // Load environment variables from .env file

const port = 3001;
const host_ip = "localhost";

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

export const DeleteInformation = async (CarNumber) => {
  const baseURL = `http://${host_ip}:${port}/delete/${CarNumber}`;
  try {
    const response = await axios.delete(baseURL);
    console.log("API response:", response.status, response.data);

    if (response.status === 200) {
      console.log("Delete successful with status 201!");
      return true;
    } else {
      console.log("Delete operation failed!");
      return false;
    }
  } catch (err) {
    console.error("API error:", err.response.status, err.response.data);

    return false;
  }
};
