CREATE DATABASE IF NOT EXISTS comverga;
USE comverga;

-- Creating table - Customers

CREATE TABLE `customers` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Telephone` varchar(20) NOT NULL,
  `Address` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
);

-- Creating table - Services

CREATE TABLE `services` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `ID_Customer` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`ID_Customer`) REFERENCES `customers` (`ID`)
);

-- Creating table - Users

CREATE TABLE `users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` enum('admin', 'customer') NOT NULL,
  `ID_Customer` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`ID_Customer`) REFERENCES `customers` (`ID`)
);