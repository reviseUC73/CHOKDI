import axios from "axios";
// require("dotenv").config(); // Load environment variables from .env file

const port = import.meta.env.VITE_API_PORT;
const host_ip = import.meta.env.VITE_API_HOST_IP;

export const AllInformation = async () => {
  const baseURL = `http://${host_ip}:${port}/infoIns/read`;

  try {
    const response = await axios.get(baseURL, {
      withCredentials: true,
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const DeleteInformation = async (CarNumber) => {
  const baseURL = `http://${host_ip}:${port}/infoIns/delete/${CarNumber}`;
  try {
    const response = await axios.delete(baseURL, {
      withCredentials: true,
    });
    console.log("API response:", response.status, response.data);

    if (response.status === 204) {
      console.log("Delete successful with status 204!");
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

// Function to check for duplicate data
export const CheckDuplicateData = async (data) => {
  const duplicateURL = `http://${host_ip}:${port}/infoIns/check-duplicate`;
  const dataFormat = JSON.stringify(data);

  try {
    const response = await axios.post(duplicateURL, dataFormat, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response);
    return response.data.duplicate;
  } catch (error) {
    console.log("Failed to check duplicate data", error);
    return false;
  }
};
export const CreateInformation = async (data) => {
  // Define the data to be sent in the request body

  const baseURL = `http://${host_ip}:${port}/infoIns/create`;
  var data_format = JSON.stringify(data);

  if (!data.VehicleNumber || !data.CustomerName || !data.InsuranceCompany) {
    console.log("Missing required field(s)");
    return false;
  }

  try {
    // Send the PUT request
    const response = await axios.post(baseURL, data_format, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      return true;
    } else if (response.status === 400) {
      console.log(response.data);
    }
    return false;
  } catch (e) {
    console.log("Failed to submit data", e);
    return false;
  }
};

export const EditInformation = async (user_id, data) => {
  const baseURL = `http://${host_ip}:${port}/infoIns/edit/${user_id}`;
  var data_format = JSON.stringify(data);
  try {
    // Send the PUT request
    const response = await axios.post(baseURL, data_format, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (response.status === 201) {
      return true;
    }
    return false;
  } catch (e) {
    console.log("Failed to fail data", e);
    return false;
  }
};

export const TokenDecodeGOOGLE = async (token) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          // value: "same-origin", // "same-origin-allow-popups"
        },
      }
    );
    // console.log(response);
    // Check for a successful response (status code 200)
    if (response.status === 200) {
      // console.log(response);
      return response;
    } else {
      if (response.status === 401) {
        console.log("Token expired or Token not found or Token invalid");
      } else {
        // Handle unexpected response status codes
        console.error("Unexpected response status:", response.status);
      }
      return null;
    }
    // return response;
  } catch (e) {
    console.log(e);
    console.log("Failed to decode token");
    return null;
  }
};

export const login_api = async (data) => {
  const baseURL = `http://${host_ip}:${port}/auth/login`;

  if (!data) {
    console.log("Missing required field(s)");
    return false;
  }
  var data_format = JSON.stringify(data);

  try {
    const response = await axios.post(baseURL, data_format, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // ยอมรับ status codes ระหว่าง 200-499
      },
    });
    return response;

    // console.log("status", response.status);
  } catch (err) {
    console.log("Error:", err);
  }
};
// click on login google -> gogole sent token to font
// -> font call this api -> by sent user id password

export const Login_api_google = async (data) => {
  const baseURL = `http://${host_ip}:${port}/auth/login-google`;
  if (!data) {
    console.log("Missing required field(s)");
    return false;
  }
  var data_format = JSON.stringify(data);
  try {
    const response = await axios.post(baseURL, data_format, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // ยอมรับ status codes ระหว่าง 200-499
      },
    });
    console.log("Response.status : ", response.status);
    if (response.status === 200) {
      return response; // Return just the data, but this is up to your needs
    } else if (response.status === 401) {
      console.log("This email is not yet in db.");
      return response;
    } else {
      // สำหรับ status codes อื่น ๆ ที่ไม่ได้จัดการใน if และ else if ข้างต้น
      console.log("Response with status:", response.status);
      return response;
    }
  } catch (err) {
    console.log("Error:");
    console.log(err);
    return false;
  }
};

export const CreateAuthUser = async (userData) => {
  const { Mail, Password, FirstName, LastName, Role } = userData;

  if (!Mail || !Password || !Role || !FirstName || !LastName) {
    console.error("Missing required field(s)");
    return { success: false, message: "Missing required field(s)" };
  }

  try {
    // Send the POST request
    const BASE_URL = `http://${host_ip}:${port}/auth/register`;

    const response = await axios.post(BASE_URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    // Check the response status
    if (response.status === 201) {
      return { success: true, data: response.data };
    } else if (response.status === 400) {
      console.error("Bad Request:", response.data);
      return { success: false, message: "Bad request", data: response.data };
    } else {
      console.error("Unhandled response status:", response.status);
      return {
        success: false,
        message: `Unhandled response status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Failed to submit data", error);
    return {
      success: false,
      message: "Error occurred while making the request",
      error,
    };
  }
};
