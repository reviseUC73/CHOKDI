-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 09, 2023 at 04:48 AM
-- Server version: 8.0.31
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Chokdi`
--

-- --------------------------------------------------------

--
-- Table structure for table `CustomerInsurance`
--

CREATE TABLE `CustomerInsurance` (
  `CustomerID` int NOT NULL,
  `CustomerName` varchar(255) DEFAULT NULL,
  `CustomerAddress` varchar(255) DEFAULT NULL,
  `Brand` varchar(50) DEFAULT NULL,
  `Model` varchar(50) DEFAULT NULL,
  `EngineCapacity` int DEFAULT NULL,
  `VehicleNumber` varchar(255) DEFAULT NULL,
  `VehicleManufactureYear` int DEFAULT NULL,
  `VehicleBody` varchar(255) DEFAULT NULL,
  `VehicleType` varchar(255) DEFAULT NULL,
  `VehicleCode` varchar(255) DEFAULT NULL,
  `InsuranceCompany` varchar(100) DEFAULT NULL,
  `CoverageType` int DEFAULT NULL,
  `CoverageStartDate` datetime DEFAULT NULL,
  `CoverageEndDate` datetime DEFAULT NULL,
  `PolicyValue` decimal(15,2) DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CustomerInsurance`
--
ALTER TABLE `CustomerInsurance`
  ADD PRIMARY KEY (`CustomerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
