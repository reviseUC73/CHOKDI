import React from "react";
import { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import moment from "moment";

import "./Table.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
function EditData({ result }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [buttonStatus, setButtonStatus] = useState(false);
  const handleExpandRow = (VehicleNumber) => {
    setExpandedRow(expandedRow === VehicleNumber ? null : VehicleNumber);
  };

  const tableCellStyle = {
    fontFamily: "Kanit, sans-serif",
    fontSize: "0.8rem",
    // paddingRight: "3rem",
    maxWidth: "10rem",
    textAlign: "left",
    // backgroundColor: "white",
    color: "#99A0CF",
    paddingBottom: "0.5rem",
    paddingTop: "0.5rem",
    textOverflow: "ellipsis",
    borderStyle: "border-box",
  };
  const tableCellStyleHead = {
    fontFamily: "Kanit, sans-serif",
    fontSize: "0.8rem",
    // paddingRight: "3rem",
    maxWidth: "10rem",
    textAlign: "left",
    backgroundColor: "white",
    color: "#7680bf",
    paddingBottom: "1rem",
    paddingTop: "1rem",
    textOverflow: "ellipsis",
    borderStyle: "border-box",
  };

  const getSortIcon = (column) => {
    if (sortedColumn === column) {
      return sortDirection === "asc" ? (
        <IconButton size="small" style={{ padding: "0.1rem" }}>
          <KeyboardArrowUpIcon
            style={{
              color: "#7680bf",
            }}
          />
        </IconButton>
      ) : (
        <IconButton size="small" style={{ padding: "0.1rem" }}>
          <KeyboardArrowDownIcon
            style={{
              color: "#7680bf",
            }}
          />
        </IconButton>
      );
    }
    return (
      <IconButton size="small" style={{ padding: "0.1rem" }}>
        <KeyboardArrowUpIcon
          style={{
            color: "#7680bf",
          }}
        />
      </IconButton>
    );
  };
  const handleSort = (column) => {
    if (column === sortedColumn) {
      // If the same column is clicked again, toggle the sort direction
      // console.log(sortDirection + column);
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set it as the sorted column with ascending order
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };
  const sortedResult = [...result]; // Create a copy of the original result array
  sortedResult.sort((a, b) => {
    const valueA = a[sortedColumn];
    const valueB = b[sortedColumn];

    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const theme = createTheme({
    palette: {
      del: {
        main: "#ef5350",
        contrastText: "#fff",
      },
      edit: {
        main: "#ed6c02",
        contrastText: "#fff",
      },
    },
  });
  return (
    <div id="overflowX">
      <TableContainer component={Paper}>
        <Table className="order-list">
          <TableHead>
            <TableRow>
              <TableCell
                id="col_main"
                onClick={() => handleSort("VehicleNumber")}
                style={tableCellStyleHead}
              >
                <div>
                  {getSortIcon("VehicleNumber")}
                  VehicleNumber
                </div>
              </TableCell>
              <TableCell
                id="col_main"
                onClick={() => handleSort("CustomerName")}
                style={tableCellStyleHead}
              >
                <div>
                  {getSortIcon("CustomerName")}
                  CustomerName
                </div>
              </TableCell>
              <TableCell
                id="col_main"
                onClick={() => handleSort("InsuranceCompany")}
                style={tableCellStyleHead}
              >
                <div>
                  {getSortIcon("InsuranceCompany")}
                  InsuranceCompany
                </div>
              </TableCell>
              <TableCell
                id="col_main"
                onClick={() => handleSort("PolicyValue")}
                style={tableCellStyleHead}
              >
                <div>
                  {getSortIcon("PolicyValue")}
                  PolicyValue
                </div>
              </TableCell>
              <TableCell
                id="col_main"
                onClick={() => handleSort("CoverageStartDate")}
                style={tableCellStyleHead}
              >
                <div>
                  {getSortIcon("CoverageStartDate")}
                  CoverageStartDate
                </div>
              </TableCell>
              <TableCell
                id="col_main"
                onClick={() => handleSort("CoverageEndDate")}
                style={tableCellStyleHead}
              >
                <div>
                  {getSortIcon("CoverageEndDate")}
                  CoverageEndDate
                </div>
              </TableCell>

              <TableCell id="col_main" style={tableCellStyleHead}>
                <div></div>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedResult.map((row, index) => (
              <React.Fragment key={row.VehicleNumber}>
                <TableRow
                  style={{
                    backgroundColor: index % 2 === 0 ? "#F7FAFF" : "white",
                  }}
                >
                  <TableCell style={tableCellStyle}>
                    {row.VehicleNumber}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {row.CustomerName}
                  </TableCell>

                  <TableCell style={tableCellStyle}>
                    {row.InsuranceCompany}
                  </TableCell>

                  <TableCell style={tableCellStyle}>
                    {row.PolicyValue}
                  </TableCell>

                  <TableCell style={tableCellStyle}>
                    {moment(row.CoverageStartDate).utc().format("ll")}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {moment(row.CoverageEndDate).utc().format("ll")}
                  </TableCell>

                  <TableCell
                    style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      style={{ justifyContent: "center" }}
                    >
                      <ThemeProvider theme={theme}>
                        {/* <ThemeProvider> */}
                        <Button
                          id="edit_button"
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          color="edit"
                          //   onClick={() => Load_data(row)}
                          disabled={buttonStatus}
                          style={{
                            fontSize: "0.7rem",
                            paddingLeft: "0.5rem",
                            paddingRight: "0.5rem",
                          }}
                        >
                          Edit
                        </Button>
                      </ThemeProvider>

                      <ThemeProvider theme={theme}>
                        {/* <ThemeProvider> */}
                        <Button
                          id="del_button"
                          variant="outlined"
                          size="small"
                          // size="medi"
                          startIcon={<DeleteIcon />}
                          color="del"
                          //   onClick={() => Delete_data(row.AccountID)}
                          disabled={buttonStatus}
                          style={{
                            fontSize: "0.7rem",
                            paddingLeft: "0.5rem",
                            paddingRight: "0.5rem",
                          }}
                        >
                          Delete
                        </Button>
                      </ThemeProvider>
                    </Stack>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EditData;