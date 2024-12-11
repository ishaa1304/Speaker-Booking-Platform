# Speaker Booking System

This is a full-stack web application designed for users to browse and book sessions with speakers. The system includes a secure authentication system, speaker management, and a session booking system. Built with React on the frontend, Node.js on the backend, and MongoDB as the database, the application offers an easy-to-use interface for users and admins alike.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Folder Structure](#folder-structure)
5. [API Documentation](#api-documentation)
6. [Frontend Details](#frontend-details)
7. [Backend Details](#backend-details)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- **User Authentication**: Secure signup and login system.
- **Login and Signup**: For user, use  signup buttons and for speaker use join as speaker button.
- **Speaker Management**: Browse speakers, view their profiles, and book available time slots.
- **Session Booking**: Select time slots for booking sessions with speakers.
- **Date and Time Selection**: Users can pick exact time slots for booking sessions.

## Tech Stack

- **Frontend**: 
  - React
  - Tailwind CSS
  - Lucide Icons
- **Backend**: 
  - Node.js with Express
  - MongoDB (NoSQL database)
  - JWT for user authentication
- **Tools**:
  - Postman for API documentation and testing
  - Git for version control
  

## Installation

### Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))


### Backend Installation

1. Navigate to the backend folder:
    ```bash
    cd backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the backend root and define the environment variables:
    ```makefile
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the backend server:
    ```bash
    npm start
    ```
    This will run the server on [http://localhost:5000](http://localhost:5000).

### Frontend Installation

1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```
    This will run the application on [http://localhost:3000](http://localhost:3000).



## Folder Structure

```
/speaker-booking-system
  /backend
    /controllers      # API endpoint logic
    /models           # MongoDB models (User, Speaker, etc.)
    /routes           # Express routes
    /middleware       # Authentication middleware (JWT)
    server.js         # Main server file
    .env              # Environment variables
  /frontend
    /src
      /components     # React components (SpeakerCard, SpeakerList, etc.)
      /pages          # React pages (Home, SpeakerList, etc.)
      /services       # API service calls
      App.js           # Main React app entry point
    package.json      # Frontend dependencies
  .gitignore          # Git ignore file
  README.md           # Project documentation
```

## API Documentation

The backend exposes several RESTful API endpoints to handle user authentication, speaker management, and session booking.

### Authentication Endpoints

- **POST /api/auth/signup**: Register a new user.
    - **Request Body**: 
        ```json
        { "email": "user@example.com", "password": "password" }
        ```
    - **Response**: 
        ```json
        { "token": "JWT token" }
        ```

- **POST /api/auth/login**: Log in to an existing user account.
    - **Request Body**:
        ```json
        { "email": "user@example.com", "password": "password" }
        ```
    - **Response**:
        ```json
        { "token": "JWT token" }
        ```

### Speaker Management Endpoints

- **GET /api/speakers**: Retrieve a list of all speakers.
    - **Response**:
        ```json
        { "speakers": [{ "id": "1", "firstName": "John", "lastName": "Doe", "pricePerSession": 100, "bio": "Speaker bio" }] }
        ```



## Frontend Details

The frontend is built with React and provides the following features:

- **SpeakerList**: Displays a list of available speakers.
- **SpeakerCard**: Each speaker's profile with an option to book a session.
- **Authentication**: Users can sign up, log in, and view their booked sessions.

## Backend Details

The backend, built with Node.js and Express, handles:

- **User Authentication**: With JWT tokens for secure login sessions.
- **Speaker Management**: CRUD operations for speakers and their availability.
- **Session Booking**: Users can book sessions based on available slots.


