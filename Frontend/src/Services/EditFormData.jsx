import { CheckDuplicateData, CreateInformation, EditInformation } from "./Api";
import Swal from "sweetalert2";
import moment from "moment";
export const OnSubmitEditFormData = async (e, fromInput) => {
  e.preventDefault();

  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1C80DD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    });
    if (result.isConfirmed) {
      let startdate = moment(fromInput.CoverageStartDate).format("YYYY-MM-DD");
      let enddate = moment(fromInput.CoverageEndDate).format("YYYY-MM-DD");

      const new_input = await {
        ...fromInput,
        CoverageStartDate: startdate,
        CoverageEndDate: enddate,
      };
      const edited = await EditInformation(fromInput.VehicleNumber, new_input);
      if (edited) {
        console.log("Edit done successfully!");
        Swal.fire({
          icon: "success",
          title: `VehicleNumber : ${fromInput.VehicleNumber} <br/>has been Changed`,
          timer: 1500,
        }).then(() => window.location.reload());
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error",
        });
        console.log("Error submitting form", err);
        // Handle edit failure
      }
    }
  } catch (err) {
    console.log("Error, " + err.message);
  }
};

// if (result.isConfirmed) {
// const edited = await EditInformation(account_id, trimmedData);
// setEditMode(false);
