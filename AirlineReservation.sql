
CREATE DATABASE AirlineReservationSystem;
USE AirlineReservationSystem;

CREATE TABLE Airlines (
    AirlineID INT AUTO_INCREMENT PRIMARY KEY,
    AirlineName VARCHAR(100) NOT NULL
);


CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Phone VARCHAR(20),
    Address VARCHAR(255)
);


CREATE TABLE Flights (
    FlightID INT AUTO_INCREMENT PRIMARY KEY,
    AirlineID INT,
    DepartureCity VARCHAR(100) NOT NULL,
    ArrivalCity VARCHAR(100) NOT NULL,
    DepartureTime DATETIME NOT NULL,
    TotalSeats INT NOT NULL,
    AvailableSeats INT NOT NULL,
    FOREIGN KEY (AirlineID) REFERENCES Airlines(AirlineID)
);


CREATE TABLE Bookings (
    BookingID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    FlightID INT,
    CabinClass VARCHAR(50),
    SeatNumber VARCHAR(10),
    BookingDate DATETIME NOT NULL,
    PaymentStatus VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID)
);


CREATE TABLE Admins (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE Payments (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    BookingID INT,
    PaymentMethod VARCHAR(50) NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate DATETIME NOT NULL,
    FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID)
);


CREATE TABLE UserPreferences (
    UserID INT PRIMARY KEY,
    MealPreference VARCHAR(50),
    SpecialAssistance VARCHAR(255),
    FrequentFlyerNumber VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


CREATE TABLE FlightStatuses (
    FlightID INT PRIMARY KEY,
    Status VARCHAR(50) NOT NULL,
    UpdateTime DATETIME NOT NULL,
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID)
);


CREATE TABLE Localizations (
    LocaleID INT AUTO_INCREMENT PRIMARY KEY,
    Language VARCHAR(50) NOT NULL,
    Currency VARCHAR(10) NOT NULL,
    TimeZone VARCHAR(50) NOT NULL
);
