
# Speaker Booking System

## Installation

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

### API Documentation with Postman

1. Import the Postman collection from the `/postman` folder in the project.
2. Use Postman to test all API endpoints such as signup, login, fetching speakers, and booking sessions.

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
  /postman            # Postman collection for API testing
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

- **GET /api/speakers/booked-slots/:speakerId**: Retrieve all booked slots for a specific speaker.
    - **Response**:
        ```json
        { "bookedSlots": ["2024-12-20T10:00:00Z", "2024-12-20T11:00:00Z"] }
        ```

- **POST /api/speakers/book-session/:speakerId**: Book a session with a speaker.
    - **Request Body**:
        ```json
        { "date": "2024-12-20T10:00:00Z" }
        ```
    - **Response**:
        ```json
        { "message": "Session booked successfully" }
        ```

### Session Management Endpoints

- **POST /api/sessions**: Admin creates a session.
    - **Request Body**:
        ```json
        { "speakerId": "1", "date": "2024-12-20T10:00:00Z" }
        ```
    - **Response**:
        ```json
        { "message": "Session created successfully" }
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

## Contributing

We welcome contributions to this project. Please fork the repository, make changes, and submit pull requests.

- Fork the repo
- Create a new branch
- Make your changes
- Push your changes
- Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
