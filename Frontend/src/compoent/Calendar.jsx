import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Calendar({ formInput, setFormInput, CoverageDate }) {
  // const [value, setValue] = React.useState(null);
  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };
  // console.log( CoverageDate);
  console.log(formInput);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={CoverageDate}
        // value={value}
        value={dayjs(formInput[CoverageDate])}
        onChange={(value) => {
          setFormInput({ ...formInput, [CoverageDate]: formatDate(value) });
        }}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
