import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import "./SearchBar.css";
import { AllInformation } from "../Services/Api";

function SearchBar({ setResult }) {
  const [keySearch, setKeySearch] = useState("");
  const handleChange = (event) => {
    // console
    setKeySearch(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [keySearch]);

  const SearchInData = (data, keySearch) => {
    // console.log(data);
    // console.log(keySearch)
    const filteredData = data.filter(
      (val_item) =>
        val_item.VehicleNumber.toLowerCase().includes(keySearch) ||
        // val_item.CustomerID.toLowerCase().includes(keySearch) ||
        val_item.InsuranceCompany.toLowerCase().includes(keySearch) ||
        val_item.CustomerName.toLowerCase().includes(keySearch)

    );
    return filteredData;
  };

  async function fetchData() {
    try {
      const data = await AllInformation();
      // console.log(data)
      let searchResult = data;
      if (keySearch.trim() !== "") {
        searchResult = SearchInData(data, keySearch.toLowerCase());
      }
      setResult(searchResult);
      console.log(searchResult);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Paper
      id="SearchBar"
      component="form"
      sx={{
        p: "2px 3px",
        display: "flex",
        alignItems: "center",
        // width: "15rem",
        backgroundColor: "#f3f7fe",
        borderColor: "#DCE2EB",
        boxShadow: "1px 1px 2px 3px rgba(0, 0, 0, 0.04)",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search "
        inputProps={{ "aria-label": "search google maps" }}
        id="search"
        type="search"
        label=""
        value={keySearch}
        onChange={handleChange}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
