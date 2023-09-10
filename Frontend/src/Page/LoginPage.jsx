import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import GoogleButton from "react-google-button";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { TokenDecode } from "../Services/Api";
import Divider from "@mui/material/Divider";
function LoginPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // token can use from request body and ttps://www.googleapis.com/oauth2/v1/userinfo?access_token=$
  useEffect(() => {
    const fetchData = async () => {
      console.log(user);
      if (user) {
        try {
          const data = await TokenDecode(user.access_token);
          setProfile(data);
          console.log(profile);
        } catch (error) {
          console.log(error);

          // Handle the error as needed
        }
      }
    };

    fetchData();
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("codeResponse");
      console.log(codeResponse);
      setUser(codeResponse);
      localStorage.setItem("accessToken", codeResponse.access_token);
      window.location.reload();
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  // const handleGoogleLoginSuccess = (credentialResponse) => {
  //   // console.log(credentialResponse.credential);
  //   localStorage.setItem("credential", credentialResponse.credential);
  //   window.location.reload();
  // };

  return (
    <div className="container_auth">
      <div>
        <div className="form-container_auth " id="login-form">
          <div id="auth_topic">Login</div>
          <img
            id="img_auth"
            src="../../image/login_img.png"
            alt="Italian Trulli"
          />
          <form id="form_auth">
            <label for="username" id="label_auth">
              Username
            </label>
            <input
              className="input_auth"
              type="text"
              id="username"
              name="username"
              required
            />
            <label for="password" id="label_auth">
              Password
            </label>
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

          {profile ? (
            <div>
              <button onClick={logOut}>Log out</button>
            </div>
          ) : (
            // <button onClick={() => login()}>Sign in with Google 🚀 </button>
            <div id="container_auth_button">
              <div className="g-signin-button" onClick={login}>
                <div className="g-icon">
                  <img
                    src="https://freepngimg.com/save/66274-school-google-pearl-button-up-sign-middle/1600x1600"
                    alt="Google Icon"
                  />
                </div>
                <span className="g-text"></span>
              </div>
            </div>
          )}
          {/* <div id="container_auth_button">
            <a href="#" onclick="signInWithGoogle()" class="google-btn">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Icon"
                class="google-icon"
              />
              Sign in with Google
            </a>
          </div> */}
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
