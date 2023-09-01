import React, { useState } from "react";
import "./Form.css";
import { IconButton, TextField, colors } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleMinus,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "./Calendar";
import moment from "moment";
import { OnSubmitCreateForm } from "../Services/CreateData";

function Form() {
  const currentDate = moment().format("YYYY-MM-DD");
  const [duplicate, setDuplicate] = useState(false); // [state, setState
  const [formInput, setFormInput] = useState({
    CustomerName: "",
    CustomerAddress: "",
    Brand: "",
    Model: "",
    EngineCapacity: "",
    VehicleNumber: "",
    VehicleManufactureYear: "",
    VehicleBody: "",
    VehicleType: "",
    VehicleCode: "",
    InsuranceCompany: "",
    CoverageType: "",
    CoverageStartDate: currentDate,
    CoverageEndDate: currentDate,
    PolicyValue: "",
    Remark: "",
    Mail: "user@gmail.com",
  });

  const handleChange = (e) => {
    const { target } = e; //  target = e.target is thing that changed state
    const { name } = target; // name = e.target.name
    const value = e.target.value;
    setFormInput({ ...formInput, [name]: value });
    // console.log(formInput);
  };
  //   Calendar.
  const ClosePopup = () => {
    const overlay = document.getElementById("overlay");
    // console.log(overlay);
    setFormInput({
      CustomerName: "",
      CustomerAddress: "",
      Brand: "",
      Model: "",
      EngineCapacity: "",
      VehicleNumber: "",
      VehicleManufactureYear: "",
      VehicleBody: "",
      VehicleType: "",
      VehicleCode: "",
      InsuranceCompany: "",
      CoverageType: "",
      CoverageStartDate: currentDate,
      CoverageEndDate: currentDate,
      PolicyValue: "",
      Remark: "",
      Mail: "user@gmail.com",
    });
    const form = document.getElementsByClassName("grid-popup")[0];
    form.style.animation = "fade-out 0.3s ease-out forwards";

    // overlay.style.display = "none";
    setTimeout(() => {
      overlay.style.display = "none";
      form.style.animation = ""; // Reset animation
      setFormInput({
        CustomerName: "",
        CustomerAddress: "",
        Brand: "",
        Model: "",
        EngineCapacity: "",
        VehicleNumber: "",
        VehicleManufactureYear: "",
        VehicleBody: "",
        VehicleType: "",
        VehicleCode: "",
        InsuranceCompany: "",
        CoverageType: "",
        CoverageStartDate: currentDate,
        CoverageEndDate: currentDate,
        PolicyValue: "",
        Remark: "",
        Mail: "user@gmail.com",
      });
    }, 300); // Wait for animation to finish
  };
  const HidePopup = () => {
    const overlay = document.getElementById("overlay");
    console.log(overlay);
    // overlay.style.display = "none";
    const form = document.getElementsByClassName("grid-popup")[0];
    form.style.animation = "fade-out 0.3s ease-out forwards";
    setTimeout(() => {
      overlay.style.display = "none";
      form.style.animation = "";
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the form submission logic here
    await OnSubmitCreateForm(formInput, setFormInput, duplicate, setDuplicate);
  };
  return (
    <form className="overlay" id="overlay" onSubmit={handleSubmit}>
      <div className="grid-popup">
        <IconButton id="hide-popup" onClick={HidePopup}>
          <FontAwesomeIcon icon={faCircleMinus} style={{ color: "#F7B602" }} />
        </IconButton>
        <IconButton id="close-popup" onClick={ClosePopup}>
          <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#E05050" }} />
        </IconButton>
        <div id="tilte-create"> Create </div>
        <TextField
          required
          name="VehicleNumber"
          label="VehicleNumber"
          onChange={handleChange}
          error={duplicate}
          helperText={duplicate ? "VehicleNumber exists" : ""}
          value={formInput.VehicleNumber}
        />
        <TextField
          required
          name="Model"
          label="Model"
          onChange={handleChange}
          value={formInput.Model}
        />
        <TextField
          required
          name="VehicleManufactureYear"
          label="VehicleManufactureYear"
          onChange={handleChange}
          type="number"
          value={formInput.VehicleManufactureYear}
        />
        <TextField
          required
          name="VehicleBody"
          label="VehicleBody"
          onChange={handleChange}
          value={formInput.VehicleBody}
        />
        <TextField
          required
          name="VehicleType"
          label="VehicleType"
          onChange={handleChange}
          value={formInput.VehicleType}
        />
        <TextField
          required
          name="VehicleCode"
          label="VehicleCode"
          onChange={handleChange}
          value={formInput.VehicleCode}
        />
        <TextField
          required
          name="CustomerName"
          label="CustomerName"
          onChange={handleChange}
          value={formInput.CustomerName}
        />
        <TextField
          required
          name="Brand"
          label="Brand"
          onChange={handleChange}
          value={formInput.Brand}
        />
        <TextField
          required
          name="EngineCapacity"
          label="EngineCapacity (CC.)"
          onChange={handleChange}
          type="number"
          value={formInput.EngineCapacity}
        />
        <TextField
          required
          name="CustomerAddress"
          label="CustomerAddress"
          onChange={handleChange}
          className="address"
          value={formInput.CustomerAddress}
        />
        <TextField
          required
          name="InsuranceCompany"
          label="InsuranceCompany"
          onChange={handleChange}
          value={formInput.InsuranceCompany}
        />
        <TextField
          required
          name="CoverageType"
          label="CoverageType"
          onChange={handleChange}
          type="number"
          value={formInput.CoverageType}
        />
        <Calendar
          formInput={formInput}
          setFormInput={setFormInput}
          CoverageDate={"CoverageStartDate"}
          value={formInput.CoverageStartDate}
        />
        <Calendar
          formInput={formInput}
          setFormInput={setFormInput}
          CoverageDate={"CoverageEndDate"}
          value={formInput.CoverageEndDate}
        />

        <TextField
          required
          name="Remark"
          label="Remark"
          onChange={handleChange}
          className="remark"
          value={formInput.Remark}
        />
        <TextField
          required
          name="PolicyValue"
          label="PolicyValue"
          onChange={handleChange}
          type="number"
          value={formInput.PolicyValue}
        />
        {/* <TextField required name="Mail" label="Mail" onChange={handleChange} /> */}
        <IconButton
          id="send-icon"
          type="submit" // This is important to trigger form submission
          style={{
            // marginTop: "1rem",
            justifySelf: "center",
            maxWidth: "6rem",
            position: "relative",
          }}
        >
          <FontAwesomeIcon
            icon={faCircleCheck}
            size="2x"
            style={{ color: "#30c564" }}
          />
          <div id="title-submit">Submit</div>
        </IconButton>
      </div>
    </form>
  );
}

export default Form;
