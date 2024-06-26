import React from "react";
import "./Form.css";
import { IconButton, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,

  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "./Calendar";
import "./Form.css";
import "./EditForm.css";
import moment from "moment";
import { OnSubmitEditFormData } from "../Services/EditFormData";
export const EditForm = ({ formInput, setFormInput, setButtonActive }) => {
  const handleChange = (e) => {
    const { target } = e; //  target = e.target is thing that changed state
    const { name } = target; // name = e.target.name
    const value = e.target.value;
    setFormInput({ ...formInput, [name]: value });
    // console.log(formInput);
  };

  //   Calendar.id="overlayEditform"
  const ClosePopup = () => {
    const currentDate = moment().format("YYYY-MM-DD");

    const overlayEdit = document.getElementById("overlayEditform");
    const nav = document.getElementsByClassName("nav_container_mui")[0];
    setButtonActive(false);
    // console.log(overlayEdit);

    const form = document.getElementsByClassName("grid-popup")[1];
    form.style.animation = "fade-out 0.3s ease-out forwards";

    // overlayEdit.style.display = "none";
    setTimeout(() => {
      nav.style.zIndex = "1";

      overlayEdit.style.display = "none";
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
        Mail: "",
      });
    }, 300); // Wait for animation to finish
  };

  return (
    <form
      className="edit-form"
      id="overlayEditform"
      onSubmit={(e) => OnSubmitEditFormData(e, formInput)}
    >
      <div className="grid-popup">
        {/* <IconButton id="hide-popup" onClick={HidePopup}>
            <FontAwesomeIcon icon={faCircleMinus} style={{ color: "#F7B602" }} />
          </IconButton> */}
        <IconButton id="close-popup" onClick={ClosePopup}>
          <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#E05050" }} />
        </IconButton>
        <div id="tilte-create"> Edit </div>
        <TextField
          disabled
          name="VehicleNumber"
          label="ทะเบียนรถ"
          onChange={handleChange}
          value={formInput.VehicleNumber}
        />
        <TextField
          required
          name="Model"
          label="รุ่นยานพาหนะ"
          onChange={handleChange}
          value={formInput.Model}
        />
        <TextField
          required
          name="VehicleManufactureYear"
          label="ปีที่จดทะเบียน"
          onChange={handleChange}
          type="number"
          value={formInput.VehicleManufactureYear}
        />
        <TextField
          required
          name="VehicleBody"
          label="แบบตัวถัง"
          onChange={handleChange}
          value={formInput.VehicleBody}
        />
        <TextField
          required
          name="VehicleType"
          label="เลขตัวถัง"
          onChange={handleChange}
          value={formInput.VehicleType}
        />
        <TextField
          required
          name="VehicleCode"
          label="รหัสยานพาหนะ"
          onChange={handleChange}
          value={formInput.VehicleCode}
        />
        <TextField
          required
          name="CustomerName"
          label="ชื่อลูกค้า"
          onChange={handleChange}
          value={formInput.CustomerName}
        />
        <TextField
          required
          name="Brand"
          label="ยี่ห้อยาพาหนะ"
          onChange={handleChange}
          value={formInput.Brand}
        />
        <TextField
          required
          name="EngineCapacity"
          label="จำนวน CC."
          onChange={handleChange}
          type="number"
          value={formInput.EngineCapacity}
        />
         <TextField
          required
          name="CustomerAddress"
          label="ที่อยู่ลูกค้า"
          onChange={handleChange}
          className="address"
          value={formInput.CustomerAddress}
        />
        <TextField
          required
          name="InsuranceCompany"
          label="ชื่อบริษัทประกัน"
          onChange={handleChange}
          value={formInput.InsuranceCompany}
        />
        <TextField
          required
          name="CoverageType"
          label="ประเภทประกัน"
          onChange={handleChange}
          // type="number"
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
          name="Remark"
          label="หมายเหตุ"
          onChange={handleChange}
          className="remark"
          value={formInput.Remark}
        />
        <TextField
          required
          name="PolicyValue"
          label="มูลค่ากรมธรรม์"
          onChange={handleChange}
          type="number"
          value={formInput.PolicyValue}
        />
        <TextField
          required
          name="Mail"
          label="Email"
          onChange={handleChange}
          value={formInput.Mail}
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
};

// export default EditForm;
