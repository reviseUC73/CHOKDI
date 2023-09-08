import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [login, setLogin] = useState(true);

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
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default LoginPage;
