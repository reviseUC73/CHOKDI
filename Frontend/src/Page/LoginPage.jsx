import React, { useState } from "react";
import "./LoginPage.css";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
function LoginPage() {
  // const [login, setLogin] = useState(true);
  // const [onTap, setOnTap] = useState(false);
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse.credential);
    localStorage.setItem("access_token", credentialResponse.credential);
    window.location.reload();
  };
  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="container_auth">
      <div></div>
      <div>
        <div class="form-container_auth " id="login-form">
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
          <p id="auth-box-link ">
            <a id="text_auth">Don't have an account? </a>
            <a href="/register" id="signup-link">
              Sign up
            </a>
          </p>{" "}
          {/* <button id="button_auth">Log out AZ</button> */}
          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              // var decoded = JSON.parse(credentialResponse);
              var decoded = jwt_decode(credentialResponse.credential);

              // console.log(credentialResponse);
              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            onClick={() => {
              onTap ? setOnTap(false) : setOnTap(true);
            }}
            useOneTap={onTap}
          /> */}
          {/* ;<button onClick={googleLogout()}>d</button> */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default LoginPage;
