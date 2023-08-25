import React from "react";
import { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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
function TableData({ result }) {
  // const tableCellStyle = {
  //   fontFamily: "Kanit, sans-serif", // Specify the desired font family
  //   // fontFamily: "Roboto,Helvetica,Arial,sans-serif",
  //   fontSize: "0.9rem", // Specify the desired font size
  //   paddingRight: "3rem", // Specify the desired padding
  //   maxWidth: "10rem",
  //   textAlign: "left",
  //   backgroundColor: "white", //
  //   color: "#99A0CF",
  //   // color : "#8394f8",
  //   "&:last-child": { backgroundColor: "red" },
  // };
  const [expandedRow, setExpandedRow] = useState(null);
  const handleExpandRow = (VehicleNumber) => {
    // console.log(AccountID);
    setExpandedRow(expandedRow === VehicleNumber ? null : VehicleNumber);
  };

  const tableCellStyle = {
    fontFamily: "Kanit, sans-serif",
    // fontSize: "0.9rem",
    // paddingRight: "3rem",
    // maxWidth: "10rem",
    textAlign: "left",
    // backgroundColor: "white",
    color: "#99A0CF",
    paddingBottom: "0.5em",
    paddingTop: "0.5rem",
    textOverflow: "ellipsis",
    borderStyle: "border-box",
  };
  const tableCellStyleHead = {
    fontFamily: "Kanit, sans-serif",
    // fontSize: "0.9rem",
    // paddingRight: "3rem",
    // maxWidth: "10rem",
    textAlign: "left",
    backgroundColor: "white",
    color: "#7680bf",
    paddingBottom: "0.5em",
    paddingTop: "0.5rem",
    textOverflow: "ellipsis",
    borderStyle: "border-box",
  };
  return (
    <div id="overflowX">
      <TableContainer component={Paper}>
        <Table className="order-list">
          <TableHead>
            <TableRow>
              {/* <TableCell />  */}
              <TableCell
                id="col_main"
                // onClick={() => handleSort("AccountID")}
                style={tableCellStyleHead}
              ></TableCell>
              {/* <TableCell
                id="col_main"
                style={tableCellStyleHead}
              >
                CUSTOMERID
              </TableCell> */}
              <TableCell
                id="col_main"
                // onClick={() => handleSort("CompanyName")}
                style={tableCellStyleHead}
              >
                VehicleNumber
              </TableCell>
              <TableCell
                id="col_main"
                // onClick={() => handleSort("CustomerCode")}
                style={tableCellStyleHead}
              >
                CustomerName
              </TableCell>
              <TableCell
                id="col_main"
                // onClick={() => handleSort("Email")}
                style={tableCellStyleHead}
              >
                InsuranceCompany
              </TableCell>
              <TableCell
                id="col_main"
                // onClick={() => handleSort("BillingCharge")}
                style={tableCellStyleHead}
              >
                PolicyValue
              </TableCell>
              <TableCell
                id="col_main"
                // onClick={() => handleSort("AccountStatus")}
                style={tableCellStyleHead}
              >
                CoverageStartDate
              </TableCell>{" "}
              <TableCell
                id="col_main"
                // onClick={() => handleSort("AccountStatus")}
                style={tableCellStyleHead}
              >
                CoverageEndDate
              </TableCell>
              {/* <TableCell
                id="col_main"
                style={tableCellStyleHead}
              >
                Remark
              </TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {result.map((row, index) => (
              <React.Fragment key={row.VehicleNumber}>
                <TableRow
                  style={{
                    backgroundColor: index % 2 === 0 ? "#F7FAFF" : "white",
                  }}
                >
                  <TableCell style={tableCellStyle}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleExpandRow(row.VehicleNumber)}
                    >
                      {expandedRow === row.VehicleNumber ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  {/* <TableCell style={tableCellStyle}>{row.CustomerID}</TableCell> */}
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
                    {/* <Status_icon account_status={Boolean(row.Remark)} /> */}
                    {row.CoverageStartDate}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {row.CoverageEndDate}
                  </TableCell>
                  {/* <TableCell style={tableCellStyle}>
                    {row.Remark}
                  </TableCell> */}
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0, padding: "0rem" }}
                    colSpan={11}
                  >
                    <Collapse
                      style={{
                        backgroundColor: index % 2 === 0 ? "#F7FAFF" : "white",
                        margin: "0rem",
                        padding: "0rem",
                      }}
                      in={expandedRow === row.VehicleNumber}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        id="table_row"
                        sx={{ margin: "1rem", marginLeft: "1.5rem" }}
                      >
                        <Typography
                          variant="h5"
                          gutterBottom
                          component="div"
                          style={{
                            color: "#7680bf",
                            fontFamily: "Kanit, sans-serif",
                          }}
                        >
                          Additional Details
                        </Typography>
                        <TableContainer>
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  CustomerAddress :
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.CustomerAddress}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  Brand :
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.Brand}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  Model
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.Model}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  EngineCapacity (CC.)
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.EngineCapacity} CC.
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  VehicleManufactureYear:
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.VehicleManufactureYear}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  VehicleBody
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.VehicleBody}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  VehicleType
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.VehicleType}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  VehicleCode
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.VehicleCode}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  CoverageType
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.CoverageType}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  Remark
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.Remark}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  Mail
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {row.Mail}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Collapse>
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

export default TableData;
