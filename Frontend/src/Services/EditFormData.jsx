import { CheckDuplicateData, CreateInformation, EditInformation } from "./Api";
import Swal from "sweetalert2";
export const OnSubmitEditFormData = async (e, fromInput) => {
  console.log(fromInput);
  e.preventDefault();
  // console.log("start submit");
  const Data = {
    CustomerName: fromInput.CustomerName,
    CustomerAddress: fromInput.CustomerAddress.trim(),
    Brand: fromInput.Brand.trim(),
    Model: fromInput.Model.trim(),
    EngineCapacity: fromInput.EngineCapacity.trim(),
    VehicleNumber: fromInput.VehicleNumber.trim(),
    VehicleManufactureYear: fromInput.VehicleManufactureYear.trim(),
    VehicleBody: fromInput.VehicleBody.trim(),
    VehicleType: fromInput.VehicleType.trim(),
    VehicleCode: fromInput.VehicleCode.trim(),
    InsuranceCompany: fromInput.InsuranceCompany.trim(),
    CoverageType: fromInput.CoverageType.trim(),
    CoverageStartDate: fromInput.CoverageStartDate,
    CoverageEndDate: fromInput.CoverageEndDate,
    PolicyValue: fromInput.PolicyValue.trim(),
    Remark: fromInput.Remark.trim(),
    Mail: "user@gmail.com",
  
  };
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
      const edited = await EditInformation(fromInput.VehicleNumber, Data);
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
