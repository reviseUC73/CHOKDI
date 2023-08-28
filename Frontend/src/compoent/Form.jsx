import React, { Fragment, useState } from "react";
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

function Form() {
  const currentDate = moment().format("YYYY-MM-DD");

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
    Mail: "",
  });

  const handleChange = (e) => {
    const { target } = e; //  target = e.target is thing that changed state
    const { name } = target; // name = e.target.name
    const value = e.target.value;
    setFormInput({ ...formInput, [name]: value });
    console.log(formInput);
  };
  //   Calendar.
  const ClosePopup = () => {
    const overlay = document.getElementById("overlay");
    console.log(overlay);
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
      Mail: "",
    });
    overlay.style.display = "none";
  };
  const HidePopup = () => {
    const overlay = document.getElementById("overlay");
    console.log(overlay);
    overlay.style.display = "none";
  };
  {
    /* <FontAwesomeIcon icon="fa-solid fa-circle-minus" style={{color: "#f9c334",}} /> */
  }
  //   return <Fragment></Fragment>;
  //   console.log(formInput)
  return (
    <div className="overlay" id="overlay">
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
        />
        <TextField
          required
          name="Model"
          label="Model"
          onChange={handleChange}
        />
        <TextField
          required
          name="VehicleManufactureYear"
          label="VehicleManufactureYear"
          onChange={handleChange}
        />
        <TextField
          required
          name="VehicleBody"
          label="VehicleBody"
          onChange={handleChange}
        />
        <TextField
          required
          name="VehicleType"
          label="VehicleType"
          onChange={handleChange}
        />
        <TextField
          required
          name="VehicleCode"
          label="VehicleCode"
          onChange={handleChange}
        />
        <TextField
          required
          name="CustomerName"
          label="CustomerName"
          onChange={handleChange}
        />
        <TextField
          required
          name="Brand"
          label="Brand"
          onChange={handleChange}
        />
        <TextField
          required
          name="EngineCapacity"
          label="EngineCapacity (CC.)"
          onChange={handleChange}
          type="number"
        />
        <TextField
          required
          name="CustomerAddress"
          label="CustomerAddress"
          onChange={handleChange}
          className="address"
        />
        <TextField
          required
          name="InsuranceCompany"
          label="InsuranceCompany"
          onChange={handleChange}
        />
        <TextField
          required
          name="CoverageType"
          label="CoverageType"
          onChange={handleChange}
        />
        <Calendar
          formInput={formInput}
          setFormInput={setFormInput}
          CoverageDate={"CoverageStartDate"}
        />
        <Calendar
          formInput={formInput}
          setFormInput={setFormInput}
          CoverageDate={"CoverageEndDate"}
        />
        
        <TextField
          required
          name="Remark"
          label="Remark"
          onChange={handleChange}
          className="remark"
        />
        <TextField
          required
          name="PolicyValue"
          label="PolicyValue"
          onChange={handleChange}
          type="number"
        />
        {/* <TextField required name="Mail" label="Mail" onChange={handleChange} /> */}
        <IconButton
          id="send-icon"
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
    </div>
  );
}

export default Form;
