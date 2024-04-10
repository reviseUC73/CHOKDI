import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Login_api_google,
  TokenDecodeGOOGLE,
  login_api,
} from "../Services/Api";
import Divider from "@mui/material/Divider";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginPage({ setUserInfo, userInfo, setEnableAssignPage }) {
  const [tokenOfUser, setTokenOfUser] = useState(null); //
  const [input, setInput] = useState({ Mail: "", Password: "" });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // console.log(tokenOfUser);
      if (tokenOfUser) {
        try {
          const userInfo_decode = await TokenDecodeGOOGLE(
            tokenOfUser.access_token
          );
          // setUserInfo(data);
          // console.log("UserInfo : ", userInfo_decode);
          // console.log("tokenOfUser", tokenOfUser);

          const json_ = {
            Mail: userInfo_decode.data.email,
            Token: tokenOfUser.access_token,
          };
          setUserInfo(userInfo_decode);
          const log = await Login_api_google(json_);
          // 401 : mail not use / 200 : mail used
          console.log("log : ", log.status);
          if (log.status === 401) {
            console.log(
              "Create new user and redirect to /assign info user page (./setpassword)"
            );
            setEnableAssignPage(true);
            navigate("/setpassword");
          }
          if (log.status === 201) {
            console.log("Login success and redirect to main page (./)");
            window.location.reload();
          }
        } catch (error) {
          console.log(error);

          // Handle the error as needed
        }
      }
    };

    fetchData();
  }, [tokenOfUser]);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setTokenOfUser(codeResponse);

      localStorage.setItem("accessToken", codeResponse.access_token);
      // window.location.reload();
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const handleChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const test = () => {
    const authToken = Cookies.get("authToken");

    try {
      const decodedToken = jwt_decode(authToken);
      console.log("Decoded token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
    }

    console.log("Testing");
  };

  const onSubmit = async (e, data_form) => {
    e.preventDefault();
    try {
      // api will sent cookie and respose
      const response = await login_api(data_form);
      console.log(response);
      if (response.status === 201) {
        // console.log(data_user);
        window.location.reload();
      }
      if (
        (response.status === 401 &&
          response.data.message === "Password is incorrect") ||
        response.data.message === "Email not found"
      ) {
        Swal.fire({
          icon: "warning",
          title: "Password or Email is wrong",
          text: "Please check mail and password again",
          confirmButtonColor: "#7fcee2",
        });
        console.log("wrong password");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container_auth">
      <div>
        <div className="form-container_auth " id="login-form">
          <div id="auth_topic">CHOKDI</div>
          <img
            id="img_auth"
            src="../../image/login_img.png"
            alt="Italian Trulli"
          />
          {/* <button id="button_auth" type="submit" onClick={test}>
            Cookies
          </button> */}
          <form
            id="form_auth"
            onSubmit={(e) => {
              onSubmit(e, input);
            }}
          >
            <label id="label_auth">Email</label>
            <input
              className="input_auth"
              type="text"
              id="Mail"
              name="Mail"
              onChange={handleChange}
              required
            />
            <label id="label_auth">Password</label>
            <input
              className="input_auth"
              type="password"
              id="Password"
              name="Password"
              onChange={handleChange}
              required
            />
            <button id="button_auth" type="submit">
              Login
            </button>
          </form>

          <Divider
            style={{ color: "gray", fontSize: "0.8rem", margin: "1rem" }}
          >
            OR
          </Divider>

          <div id="container_auth_button">
            <div className="g-signin-button" onClick={login}>
              <div className="g-icon">
                <img src="../../image/google_icon.png" alt="Google Icon" />
              </div>
              <span className="g-text"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
