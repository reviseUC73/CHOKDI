import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordSetPage.css";
import Swal from "sweetalert2";
import { CreateAuthUser } from "../Services/Api";

function PasswordSetPage({ userInfo }) {
  const token_g = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  // (tokenOfUser && token_g)
  useEffect(() => {
    if (!userInfo && token_g) {
      localStorage.removeItem("accessToken");
      navigate("/");
    } else {
      setInput({ ...input, Mail: userInfo.data.email, Token: token_g });
    }
  }, [userInfo]);

  const [input, setInput] = useState({
    Mail: "Email not found",
    FirstName: "",
    LastName: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Initially assume passwords match

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({ ...input, [name]: value });
    // console.log(input);
  };

  const checkPasswordDuplicate = () => {
    const { Password, ConfirmPassword } = input;

    if (Password === ConfirmPassword) {
      // Passwords match

      return true;
    } else {
      // Passwords do not match
      Swal.fire({
        icon: "warning",
        title: "Try again",
        text: "Passwords do not match",
        confirmButtonColor: "#7fcee2",
      });
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check if the passwords match
    if (!checkPasswordDuplicate()) {
      console.error("Passwords do not match");
      setPasswordsMatch(false);
      return; // If they don't match, exit early to avoid further execution
    }

    try {
      // Create a new user
      const new_user = await CreateAuthUser({ ...input, Role: "user" });
      // console.log("New user created:", new_user);

      // If the user was successfully created, navigate to the home page
      if (new_user) {
        navigate("/");
        window.location.reload();
      } else {
        console.error("User creation failed:", new_user);
      }
    } catch (err) {
      // Log any errors that occur during user creation
      console.error("Error during user creation:", err);
    }
  };

  return (
    <div className="container_auth">
      <div>
        <div className="form_set_pass" id="login-form">
          <div id="reset_password_topic">Assign Information </div>
          <img id="img_auth" src="../../image/setPass_img.jpeg" />
          <form id="form_auth" onSubmit={onSubmit}>
            <label id="label_setInfo">Email</label>
            <input
              className="input_email_disable"
              type="text"
              id="Mail"
              name="Mail"
              disabled
              value={input.Mail}
            />
            <label id="label_setInfo">First Name</label>
            <input
              className="input_set_password"
              type="text"
              id="FirstName"
              name="FirstName"
              onChange={handleChange}
              required
            />{" "}
            <label id="label_setInfo">Last Name</label>
            <input
              className="input_set_password"
              type="text"
              id="LastName"
              name="LastName"
              onChange={handleChange}
              required
            />
            <label id="label_setInfo">Password</label>
            <input
              className={
                passwordsMatch ? "input_set_password" : "input_warning"
              }
              type="password"
              id="Password"
              name="Password"
              onChange={handleChange}
              required
            />
            <label id="label_setInfo">Confirm Password</label>
            <input
              className={
                passwordsMatch ? "input_set_password" : "input_warning"
              }
              type="password"
              id="Confirm Password"
              name="ConfirmPassword"
              onChange={handleChange}
              required
            />
            <button id="button_setPassword" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PasswordSetPage;
