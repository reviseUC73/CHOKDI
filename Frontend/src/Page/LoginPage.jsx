import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useGoogleLogin } from "@react-oauth/google";
import { Login_api_google, TokenDecodeGOOGLE } from "../Services/Api";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginPage({ setUserInfo, userInfo, setIsLogin }) {
  const [tokenOfUser, setTokenOfUser] = useState(null); //
  // const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  // token can use from request body and ttps://www.googleapis.com/oauth2/v1/userinfo?access_token=$
  useEffect(() => {
    const fetchData = async () => {
      // console.log(tokenOfUser);
      if (tokenOfUser) {
        try {
          const userInfo_decode = await TokenDecodeGOOGLE(
            tokenOfUser.access_token
          );
          // setUserInfo(data);
          console.log("UserInfo : ", userInfo_decode);
          console.log("tokenOfUser", tokenOfUser);

          const json_ = {
            Mail: userInfo_decode.data.email,
            Token: tokenOfUser.access_token,
          };
          setUserInfo(userInfo_decode);
          const log = await Login_api_google(json_);
          // 401 : mail not use / 200 : mail used
          console.log("log : ", log.status);
          if (log.status === 401) {
            setIsLogin(true);
            console.log(
              "Create new user and redirect to /assign info user page (./setpassword)"
            );
            navigate("/setpassword");

            // window.location.href = "/register";
          }
          if (log.status === 201) {
            console.log("Login success and redirect to main page (./)");
            window.location.reload();
          }

          // console.log(log);
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
      // setIsLogin(true);

      localStorage.setItem("accessToken", codeResponse.access_token);
      // window.location.reload();
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const test = () => {
    // console.log("tokenOfUser", tokenOfUser);
    // console.log("userInfo", userInfo);
    // // const json_ = {
    //   Mail: userInfo.data.email,
    //   Token: tokenOfUser.access_token,
    // };
    // const log = await Login_api_google(json_);
    // console.log(log);
    // console.log(toke)
    // setIsLogin(true);
    const authToken = Cookies.get("authToken");
    // const decodedToken = jwt_decode(authToken);
    try {
      const decodedToken = jwt_decode(authToken);
      console.log("Decoded token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
    }

    // console.log(decodedToken);
    // console.log(authToken);
    console.log("Testing");
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
          <form id="form_auth">
            <label id="label_auth">Username</label>
            <input
              className="input_auth"
              type="text"
              id="username"
              name="username"
              required
            />
            <label id="label_auth">Password</label>
            <input
              className="input_auth"
              type="password"
              id="password"
              name="password"
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

          {userInfo ? null : ( // </div> //   <button onClick={logOut}>Log out</button> // <div>
            // <button onClick={() => login()}>Sign in with Google 🚀 </button>
            <div id="container_auth_button">
              <div className="g-signin-button" onClick={login}>
                <div className="g-icon">
                  <img
                    src="../../image/google_icon.png"
                    alt="Google Icon"
                  />
                </div>
                <span className="g-text"></span>
              </div>
            </div>
          )}

          <div
            id="auth-box-link "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span id="text_auth">Don't have an account? </span>
          </div>
          <div
            id="auth-box-link "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span href="/register" id="signup-link">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
