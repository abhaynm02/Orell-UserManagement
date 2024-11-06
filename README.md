"# Orell-UserManagement" 
# User Management System

The User Management System is a web application that allows users to register, log in, and manage their profiles. It is built using Spring Boot for the backend, JWT for authentication, Cloudinary for image uploading, React and Redux for the frontend, and MySQL for the database.

## Features

1. **User Registration**: Users can register by providing their name, email, and password.
2. **User Login**: Registered users can log in to the system using their email and password.
3. **Profile Management**: Logged-in users can view and edit their profile information, including their name,password and profile picture.
4. **Image Uploading**: Users can upload a profile picture, which is stored using the Cloudinary cloud-based image storage service.
5. **JWT Authentication**: The application uses JSON Web Tokens (JWT) for user authentication, ensuring secure access to the system.

## Technologies Used

- **Backend**: Spring Boot, JWT, Cloudinary
- **Frontend**: React, Redux
- **Database**: MySQL
- **Build Tool**: Maven

## Getting Started

### Prerequisites

- Java 8 or higher
- MySQL database
- Node.js and npm

### Installation

1. **Clone the repository**:
2. https://github.com/abhaynm02/Orell-UserManagement.git
3. 2. **Configure the application**:

- **Backend**:
  - Open the `application.properties` file located in the `src/main/resources` directory.
  - Update the database connection details (URL, username, and password) to match your MySQL configuration.
  - Set the Cloudinary environment variables (`CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `CLOUDINARY_CLOUD_NAME`) with your Cloudinary account credentials.

- **Frontend**:
  - Navigate to the `frontend` directory.

3. **Build and run the application**:

- **Backend**:
  - In the project root directory, run the following command to build the Spring Boot application:
    ```
    mvn clean install
    ```
  - Run the application with the following command:
    ```
    mvn spring-boot:run
    ```

- **Frontend**:
  - Navigate to the `frontend` directory.
  - Install the dependencies with the following command:
    ```
    npm install
    ```
  - Start the development server with the following command:
    ```
    npm run dev
    ```

4. **Access the application**:

- The backend will be running on `http://localhost:8080`.
- The frontend will be running on `http://localhost:3000`.

## Configuration

The application properties can be configured in the `application.properties` file located in the `src/main/resources` directory. The following properties can be set:

- `spring.datasource.url`: The URL of the MySQL database.
- `spring.datasource.username`: The username for the MySQL database.
- `spring.datasource.password`: The password for the MySQL database.
- `cloudinary.api-key`: The API key for the Cloudinary account.
- `cloudinary.api-secret`: The API secret for the Cloudinary account.
- `cloudinary.cloud-name`: The cloud name for the Cloudinary account.

## Contributing

If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue in the [GitHub repository]([https://github.com/your-username/user-management-system](https://github.com/abhaynm02/Orell-UserManagement.git)).
