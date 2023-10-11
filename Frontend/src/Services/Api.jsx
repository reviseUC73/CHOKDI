import axios from "axios";
// require("dotenv").config(); // Load environment variables from .env file

const port = 3001;
const host_ip = "localhost";

export const AllInformation = async () => {
  const baseURL = `http://${host_ip}:${port}/infoIns/read`;

  try {
    const response = await axios.get(baseURL);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const DeleteInformation = async (CarNumber) => {
  const baseURL = `http://${host_ip}:${port}/infoIns/delete/${CarNumber}`;
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
    });
    console.log(response.status);
    if (response.status === 200) {
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

export const login_api = async (data) => {};
// click on login google -> gogole sent token to font
// -> font call this api -> by sent user id password

export const Login_api_google = async (data) => {
  // click on login google -> gogole sent token to font
  // -> font call this api -> by sent only mail in request body
  // -> if mail exist -> return status and keep cookie
  // console.log(data);
  // req : token and mail
  // return status and keep token cookie and json(message, your token , user_Data) -> token(Mail,Role)
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
    });
    console.log(response.status);
    if (response.status === 200) {
      // console.log("response.status = " + response.status);
      // console.log("response.meessage = " + response.message);
      // console.log("response.token = " + response.token);
      // console.log("response.user = " + response.user);

      return response.data; // Return just the data, but this is up to your needs
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const CreateAuthUser = async (data) => {
  //  data is json format -> { email: , password, firstname ,lastname , role }
  const baseURL = `http://${host_ip}:${port}/auth/google-create-account`;
  console.log(data);
  if (
    !data.email ||
    !data.password ||
    !data.role ||
    !data.firstName ||
    !data.lastName
  ) {
    console.log("Missing required field(s)");
    return false;
  }

  var data_format = data; // convert json to string

  try {
    // Send the PUT request
    const response = await axios.post(baseURL, data_format, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
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
