import React from "react";
import { useState, useEffect } from "react";
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

function TableData({ result }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const handleExpandRow = (VehicleNumber) => {
    setExpandedRow(expandedRow === VehicleNumber ? null : VehicleNumber);
  };

  const tableCellStyle = {
    fontFamily: "Kanit, sans-serif",
    fontSize: "0.9rem",
    maxWidth: "10rem",
    textAlign: "left",
    // color: "#99A0CF",
    // color: "#2B325D",
    color: "#495079",

    paddingBottom: "0.5rem",
    paddingTop: "0.5rem",

    textOverflow: "ellipsis",
    borderStyle: "border-box",
  };
  const tableCellStyleHead = {
    fontFamily: "Kanit, sans-serif",
    fontSize: "0.9rem",
    // paddingRight: "3rem",
    maxWidth: "10rem",
    textAlign: "left",
    backgroundColor: "white",
    // color: "#7680bf",
    // color: "#2B325D",
    color: "#495079",
    paddingBottom: "1rem",
    paddingTop: "1rem",
    textOverflow: "ellipsis",
    borderStyle: "border-box",
  };
  function calculateDaysRemaining(targetDateString) {
    const currentDate = moment();
    const targetDate = moment(targetDateString);

    const daysRemaining = targetDate.diff(currentDate, "days");
    return daysRemaining;
  }

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
  return (
    <div id="overflowX">
      <TableContainer
        component={Paper}
        style={{
          borderRadius: "0.8rem",
          boxShadow: "none",
          marginBottom: "1rem",
        }}
      >
        <Table className="order-list">
          <TableHead>
            <TableRow>
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

              <TableCell
                id="col_main"
                onClick={() => handleSort("CoverageEndDate")}
                style={tableCellStyleHead}
              >
                <div>
                  {getSortIcon("DayRemaining")}
                  DayRemaining
                </div>
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
            {sortedResult.map((row, index) => (
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
                      style={{ padding: "0.15rem" }}
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
                    {/* {moment.utc('2019-11-03T05:00:00.000Z').format('LL')} */}
                    {moment(row.CoverageStartDate).utc().format("ll")}
                    {/* {moment().format()} */}

                    {/* {row.CoverageStartDate} */}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {moment(row.CoverageEndDate).utc().format("ll")}
                    {/* () */}
                    {/* {calculateDaysRemaining('2024-08-30') } days remaining */}
                  </TableCell>
                  {/* <TableCell style={tableCellStyle}>
                    {row.Remark}
                  </TableCell> */}
                  <TableCell style={tableCellStyle}>
                    {calculateDaysRemaining(row.CoverageEndDate)} days
                  </TableCell>
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

                              <TableRow>
                                <TableCell style={tableCellStyle}>
                                  DayRemaining
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                  {calculateDaysRemaining(row.CoverageEndDate)}
                                  days
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
