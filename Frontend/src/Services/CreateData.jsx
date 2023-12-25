import { CheckDuplicateData, CreateInformation } from "./Api";
import Swal from "sweetalert2";
import moment from "moment";

export const OnSubmitCreateForm = async (
  fromInput,
  setFormInput,
  setDuplicate
) => {
  //   const [error, setError] = useState(true);
  //   const [duplicate, setDuplicate] = useState(false);
  const currentDate = moment().format("YYYY-MM-DD");
  console.log(fromInput);
  //   e.preventDefault()
  console.log("start submit");
  const trimmedData = {
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
    Mail: fromInput.Mail.trim(),
  };

  const isDuplicate = await CheckDuplicateData(trimmedData);
  if (isDuplicate) {
    // Handle duplicate case

    console.log("Duplicate data found!");
    Swal.fire({
      icon: "error",
      title: "Duplicate",
      text: "Duplicate data found!",
    });
    setDuplicate(true);
    return;
  }
  try {
    setDuplicate(false);
    const success = await CreateInformation(trimmedData);
    if (success) {
      console.log("Form submitted successfully");
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
      Swal.fire({
        icon: "success",
        title: "The data has been created.",
        timer: 1500,
      }).then(() => window.location.reload());
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.log("Failed to submit form");
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error",
    });
    console.log("Error submitting form", err);
  }
};
