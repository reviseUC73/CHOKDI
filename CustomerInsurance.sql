-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 25, 2023 at 12:30 PM
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
CREATE DATABASE IF NOT EXISTS `Chokdi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `Chokdi`;

-- --------------------------------------------------------

--
-- Table structure for table `CustomerInsurance`
--

CREATE TABLE `CustomerInsurance` (
  `CustomerName` varchar(255) DEFAULT NULL,
  `CustomerAddress` varchar(255) DEFAULT NULL,
  `Brand` varchar(50) DEFAULT NULL,
  `Model` varchar(50) DEFAULT NULL,
  `EngineCapacity` int DEFAULT NULL,
  `VehicleNumber` varchar(255) NOT NULL,
  `VehicleManufactureYear` int DEFAULT NULL,
  `VehicleBody` varchar(255) DEFAULT NULL,
  `VehicleType` varchar(255) DEFAULT NULL,
  `VehicleCode` varchar(255) DEFAULT NULL,
  `InsuranceCompany` varchar(100) DEFAULT NULL,
  `CoverageType` int DEFAULT NULL,
  `CoverageStartDate` date DEFAULT NULL,
  `CoverageEndDate` date DEFAULT NULL,
  `PolicyValue` decimal(15,2) DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL,
  `Mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `CustomerInsurance`
--

INSERT INTO `CustomerInsurance` (`CustomerName`, `CustomerAddress`, `Brand`, `Model`, `EngineCapacity`, `VehicleNumber`, `VehicleManufactureYear`, `VehicleBody`, `VehicleType`, `VehicleCode`, `InsuranceCompany`, `CoverageType`, `CoverageStartDate`, `CoverageEndDate`, `PolicyValue`, `Remark`, `Mail`) VALUES
('NEW JOHN #324', '123 Main', 'Toyrgrgrgrggrgrgota', 'Corrgrrgrgrgrgrgrgrgrgrgolla', 1600, 'AB1', 2023, '', '', '123456', 'ABC Insugrgrgrgrgrgrance', 3, '2023-07-31', '2024-07-30', 5000.00, 'Good ', NULL),
('John Doe', '123 Main St', 'Toyota', 'Corolla', 1600, 'AB123CD', 2023, 'Sedan', 'Private', '123456', 'ABC Insurance', 3, '2023-08-01', '2024-07-31', 5000.00, 'Good driver', NULL),
('Jane Smith', '456 Elm St', 'Honda', 'Civic', 1500, 'XY789ZW', 2022, 'Hatchback', 'Private', '987654', 'XYZ Insurance', 2, '2023-07-15', '2024-07-14', 6000.00, 'No claims', NULL),
('บษ 1234', '123 Main', 'Toyrgrgrgrggrgrgota', 'Corrolla', 1600, 'บษ 1234', 2023, 'บษ 1234', '', '123456', 'ABC Insugrgrgrgrgrgrance', 3, '2023-07-03', '2024-07-21', 5000.00, 'Good ', 'rew_2545@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CustomerInsurance`
--
ALTER TABLE `CustomerInsurance`
  ADD PRIMARY KEY (`VehicleNumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
