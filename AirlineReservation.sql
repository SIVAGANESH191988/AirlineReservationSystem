-- Table: Admins
CREATE TABLE Admins (
    adminID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Table: Airlines
CREATE TABLE Airlines (
    airlineID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Table: Users
CREATE TABLE Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255)
);

-- Table: Flights
CREATE TABLE Flights (
    flightID INT AUTO_INCREMENT PRIMARY KEY,
    airlineID INT NOT NULL,
    departureCity VARCHAR(255) NOT NULL,
    arrivalCity VARCHAR(255) NOT NULL,
    departureTime datetime(6) NOT NULL,
    totalSeats INT NOT NULL,
    availableSeats INT NOT NULL,
    FOREIGN KEY (airlineID) REFERENCES Airlines(airlineID)
);

-- Table: Bookings
CREATE TABLE Bookings (
    bookingID BIGINT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    flightID INT NOT NULL,
    cabinClass VARCHAR(255) NOT NULL,
    seatNumber VARCHAR(255) NOT NULL,
    bookingDate datetime(6) NOT NULL,
    paymentStatus VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (flightID) REFERENCES Flights(flightID)
);

-- Table: Payments
CREATE TABLE Payments (
    paymentID INT AUTO_INCREMENT PRIMARY KEY,
    bookingID BIGINT NOT NULL,
    paymentMethod VARCHAR(255) NOT NULL,
    amount DOUBLE NOT NULL,
    paymentDate datetime(6) NOT NULL,
    FOREIGN KEY (bookingID) REFERENCES Bookings(bookingID)
);

-- Table: Localizations
CREATE TABLE Localizations (
    localeID INT AUTO_INCREMENT PRIMARY KEY,
    language VARCHAR(255) NOT NULL,
    currency VARCHAR(255) NOT NULL,
    timeZone VARCHAR(255) NOT NULL
);

-- Table: UserPreferences
CREATE TABLE UserPreferences (
    userID INT PRIMARY KEY,
    mealPreference VARCHAR(255),
    specialAssistance VARCHAR(255),
    frequentFlyerNumber VARCHAR(255),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);
