import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordSetPage.css";
import Swal from "sweetalert2";
import { CreateAuthUser } from "../Services/Api";

function PasswordSetPage({ email }) {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: email,
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Initially assume passwords match

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({ ...input, [name]: value });
    // console.log(input);
  };

  const checkPasswordDuplicate = () => {
    const { password, confirmPassword } = input;

    if (password === confirmPassword) {
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
    checkPasswordDuplicate();
    if (checkPasswordDuplicate()) {
      await CreateAuthUser({ ...input, role: "user" });
    //   Swal.fire({
    //     icon: "warning",
    //     title: "DOne",
    //     text: "Passwords do not match",
    //     confirmButtonColor: "#7fcee2",
    //   });
      // Passwords match, proceed with form submission
      console.log("Passwords match, submit the form");
      //   navigator.push("/login");
      navigate("/");
      // Add your form submission logic here
    } else {
      // Passwords don't match, show an error message to the user
      console.error("Passwords do not match");
      // Update the state to indicate that passwords don't match
      setPasswordsMatch(false);
    }
  };
  return (
    <div className="container_auth">
      <div>
        <div className="form_set_pass" id="login-form">
          <div id="reset_password_topic">Assign Information </div>
          <img
            id="img_auth"
            src="https://img.freepik.com/premium-vector/humanitarian-help-concept_23-2148535314.jpg?w=996"
          />
          <form id="form_auth" onSubmit={onSubmit}>
            <label id="label_setInfo">Email</label>
            <input
              className="input_email_disable"
              type="text"
              id="username"
              name="username"
              disabled
              value={email}
            />
            <label id="label_setInfo">First Name</label>
            <input
              className="input_set_password"
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              required
            />{" "}
            <label id="label_setInfo">Last Name</label>
            <input
              className="input_set_password"
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              required
            />
            <label id="label_setInfo">Password</label>
            <input
              className={
                passwordsMatch ? "input_set_password" : "input_warning"
              }
              // ? (`input_set_password` :
              // "input-error" )

              type="password"
              id="password"
              name="password"
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
              name="confirmPassword"
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
