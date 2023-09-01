import Swal from "sweetalert2";
import { DeleteInformation } from "./Api";
export const Delete_data = async (CarNumber) => {

  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert car number " + CarNumber + " !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const deleted = await DeleteInformation(CarNumber);
        if (deleted) {
          console.log("Delete_data done");
          Swal.fire({
            icon: "success",
            title: `Account ID : ${CarNumber} <br/>been deleted`,
            timer: 1500,
          }).then(() => window.location.reload());
        } else {
          console.log("Delete_data false");
        }
      } catch (err) {
        console.log(err);
        Swal.fire(
          "Error",
          "An error occurred while deleting the data.",
          "error"
        );
      }
    }
  } catch (err) {
    console.log(err);
    Swal.fire(
      "Error",
      "An error occurred while displaying the confirmation dialog.",
      "error"
    );
  }
};
