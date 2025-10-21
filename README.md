# CipherStudio - A Browser-Based React IDE

CipherStudio is a full-stack web application that provides a live, in-browser development environment for React projects. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this application allows users to write, preview, and save their React projects directly in the browser, simulating a real-world online code editor experience like CodeSandbox.

## Core Features

* Real-time Code Editor:** A feature-rich code editor with a live preview pane powered by Sandpack.
* Full-Stack User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens).
* Project Persistence:** Logged-in users can save their projects to a MongoDB database and load them later.
* Complete File Management:** Users can create, rename, and delete files and folders within a project.
* Theme Switching:** A dynamic light/dark mode theme for user comfort.

## Tech Stack

* **Frontend:** React, React Router, Context API
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JWT (JSON Web Tokens), bcrypt.js
* **Code Sandbox:** Sandpack (from CodeSandbox)

##  Getting Started: How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later recommended)
* npm (Node Package Manager)
* A MongoDB Atlas account for the database.

### Backend Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Install the required packages:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `backend` folder and add your environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_super_secret_key_for_jwt
    ```
4.  Start the backend server:
    ```sh
    node index.js
    ```
    The server will be running on `http://localhost:5000`.

###= Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Install the required packages:
    ```sh
    npm install
    ```
3.  Start the frontend development server:
    ```sh
    npm run dev
    ```
    The application will open on `http://localhost:5173` (or another port if 5173 is busy).

## 🔗 API Endpoints

The backend provides the following RESTful API endpoints:

* **User Routes:**
    * `[POST /api/users/register](https://cipherstudio-sigma.vercel.app/register)`: Register a new user.
    * `[POST /api/users/login](https://cipherstudio-sigma.vercel.app/login)`: Log in a user and receive a token.
* **Project Routes (Protected):**
    * `POST /api/projects`: Save a new project.
    * `GET /api/projects`: Get all projects for the logged-in user.
    * `PUT /api/projects/:id`: Update a specific project.
    * `DELETE /api/projects/:id`: Delete a specific project.

## Author

* Nitish Kumar
* GitHub: https://github.com/000Nitish
* LinkedIn: https://www.linkedin.com/in/nitish-kumar001/
