
# Social Waves Backend Documentation

Welcome to the backend documentation of "Social Waves." This documentation provides an in-depth understanding of the Node.js backend that powers the "Social Waves" application. "Social Waves" is a full-stack social media platform where users can share photos, interact with posts, and connect with others.

Project Live at: https://social-wave-backend-production.up.railway.app/

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Cloning the Repository](#cloning-the-repository)
   - [Installing Dependencies](#installing-dependencies)
   - [Environment Variables](#environment-variables)
   - [Database Setup](#database-setup)
3. [Project Structure](#project-structure)
   - [Folder Structure](#folder-structure)
   - [Key Files](#key-files)
4. [Authentication](#authentication)
   - [JWT Token Authentication](#jwt-token-authentication)
   - [Middleware](#middleware)
5. [Controllers](#controllers)
   - [User Controller](#user-controller)
   - [Post Controller](#post-controller)
6. [API Documentation](#api-documentation)
    - [API Endpoints](#api-endpoints)
    - [Request and Response Examples](#request-and-response-examples)
7. [Contributing](#contributing)
    - [How to Contribute](#how-to-contribute)
    - [Coding Standards](#coding-standards)

## 1. Introduction

Welcome to the backend documentation of "Social Waves." This documentation provides an in-depth understanding of the Node.js backend that powers the "Social Waves" application. "Social Waves" is a full-stack social media platform where users can share photos, interact with posts, and connect with others.

## Purpose

The purpose of this backend is to handle critical functionalities of the "Social Waves" application, including user management, post handling, authentication, and data storage. It plays a pivotal role in ensuring the seamless operation of the platform, providing secure access to authorized users, and managing the storage and retrieval of user-generated content.

## Key Features

The "Social Waves" backend boasts several key features, including:

- **Authentication:** Secure user authentication using JSON Web Tokens (JWT) to verify user identities and protect sensitive data.
  
- **User Management:** Management of user profiles, including registration, login, profile updates, and authentication status.
  
- **Post Handling:** Management of user-generated posts, including creation, updating, and deletion, while ensuring data integrity and consistency.
  
- **Data Storage:** Storage of user information and posts in a database, facilitating data retrieval and searching.
  
- **Error Handling:** Robust error handling and response mechanisms to ensure smooth application operation and graceful handling of unexpected scenarios.

## Technologies Used

The backend of "Social Waves" is built using Node.js, a popular JavaScript runtime, and follows a model-controller architecture for organized code structure. It utilizes the Express.js framework for building RESTful APIs and MongoDB as the database for data storage. JSON Web Tokens (JWT) are employed for secure user authentication.

## Audience

This documentation is designed for developers, contributors, and anyone interested in gaining insights into the inner workings of the "Social Waves" backend. Whether you're looking to understand the architecture, contribute to the project, or develop similar applications, this documentation provides valuable information and guidance.

## Next Steps

To get started with the "Social Waves" backend, proceed to the [Getting Started](#getting-started) section for instructions on setting up the development environment and running the backend locally.

Thank you for your interest in "Social Waves." We hope this documentation proves to be a valuable resource as you explore and contribute to the project.

## 2. Getting Started

To start working with the "Social Waves" backend, you'll need to set up your development environment and understand how to run the backend locally. This section provides step-by-step instructions to help you get started.

## Cloning the Repository

To begin, you'll need to clone the "Social Waves" backend repository from GitHub. Open your terminal and run the following command:

```bash
https://github.com/deciever002/social-wave-backend.git
```

This will create a local copy of the backend codebase on your machine.

## Installing Dependencies

Navigate to the project directory:

```bash
cd social-waves-backend
```

Next, you'll need to install the project dependencies. Ensure you have Node.js and npm (Node Package Manager) installed on your machine. If not, you can download and install them from the official website: [Node.js](https://nodejs.org/).

Install the dependencies using npm:

```bash
npm install
```

This command will download and install all the required packages and libraries specified in the project's `package.json` file.

## Environment Variables

Some parts of the "Social Waves" backend require environment variables for configuration. Create a `.env` file in the project's root directory and define the necessary variables. You can refer to the `.env.example` file for a list of required variables and their descriptions.

## Database Setup

The backend uses MongoDB as the database. Ensure you have MongoDB installed and running locally or specify the connection URL in your environment variables.

## Running the Backend Locally

With the dependencies installed and environment variables configured, you can now start the backend locally. In the project directory, run:

```bash
npm start
```

This command will start the backend server, and it should be accessible at `http://localhost:5000/`. You can test the endpoints and interact with the API using tools like Postman or your preferred API testing client.

Congratulations! You've successfully set up and run the "Social Waves" backend locally. You're now ready to explore, develop, or contribute to the project. For more details on specific functionalities and API documentation, refer to the relevant sections in this documentation.

If you encounter any issues or have questions, don't hesitate to reach out to the project maintainers or the community for assistance.


## 3. Project Structure
Understanding the project structure is essential for efficient development and maintenance of the "Social Waves" backend. In this section, we'll explore the folder structure and highlight key files that make up the project.

## Folder Structure

The "Social Waves" backend follows a structured directory layout to maintain code organization and readability. Below is an overview of the main directories and their purposes:

- **`src/`**: The source code directory contains all application code.
  - **`controllers/`**: Controllers handle the application's business logic for different features.
  - **`middleware/`**: Custom middleware functions for route authentication and request handling.
  - **`models/`**: Data models that define the structure of data stored in the database.
  - **`routes/`**: Route definitions for different API endpoints.
  - **`index.js`**: Entry point for starting the server.

- **`node_modules/`**: Dependencies installed via npm.

- **`.env`**: Environment variables file for configuring the application.

- **`.env.example`**: Example environment variables file for reference.

- **`.gitignore`**: List of files and directories to be ignored by Git.

- **`package.json`**: Project metadata and dependency information.

- **`README.md`**: Project's README file, typically containing project documentation.

## Key Files

Here are some of the key files and their roles in the project:

- **`index.js`**: The application entry point where Express.js is initialized, middleware is set up, and routes are defined.

- **`controllers/`**: Individual controller files (e.g., `userController.js`, `postController.js`) containing functions that handle specific API endpoints.

- **`models/`**: Data model files (e.g., `userModel.js`, `postModel.js`) defining the schema and methods for interacting with database collections.

- **`routes/`**: Route definition files (e.g., `userRoutes.js`, `postRoutes.js`) where API endpoints and their associated controller functions are mapped.

- **`middleware/`**: Custom middleware functions (e.g., `authMiddleware.js`) used for authentication and request handling.

- **`.env` and `.env.example`**: Environment variable files for configuring the application's settings and providing reference.


## 4. Authentication

Authentication is a critical component of the "Social Waves" backend, ensuring that only authorized users can access certain features and perform actions. In this section, we'll delve into the authentication mechanisms used in the backend, focusing on JSON Web Tokens (JWT).

## JWT Token Authentication

"Social Waves" utilizes JSON Web Tokens (JWT) for secure authentication. JWT is a widely adopted standard for creating compact, self-contained tokens that can be used to verify the authenticity of users. Here's an overview of how JWT-based authentication works in the backend:

1. **User Registration**: When a user registers or logs in, the backend generates a JWT token containing user information and a secret key.

2. **Token Issuance**: The backend issues the JWT token to the client upon successful authentication.

3. **Client Storage**: The client (typically a frontend application) stores the JWT token securely, often in local storage or a cookie.

4. **Token Usage**: The client includes the JWT token in the header of authenticated requests to the backend.

5. **Token Verification**: When a request with a JWT token is received, the backend verifies the token's signature using the secret key.

6. **Authorization**: If the token is valid and not expired, the backend grants access to the requested resource or action.

7. **User Identification**: The backend decodes the token to extract user information, allowing it to identify the authenticated user.

8. **Token Expiration**: JWT tokens have an expiration time, after which they are no longer valid. This adds an additional layer of security.

## Middleware

Authentication middleware plays a crucial role in the "Social Waves" backend. Middleware functions are used to protect routes and ensure that only authenticated users can access certain parts of the application. Here's how it works:

1. **Route Protection**: Certain routes in the backend are protected and can only be accessed by authenticated users.

2. **Route Navigation**: Middleware checks the JWT token in the request header and ensures it is valid.

3. **Redirect to Login**: If a user is not authenticated, they are typically redirected to the login page or receive an error response.

4. **Authentication Check**: Middleware performs the authentication check during login and registration as well.

5. **Access Granted**: If the token is valid and the user is authenticated, the middleware allows access to the protected resource or action.

## Security Considerations

While JWT-based authentication is a robust approach, it's essential to follow security best practices to protect against common vulnerabilities such as token theft and misuse. Key security considerations include:

- **Token Storage**: Ensure tokens are stored securely on the client-side and are not accessible to malicious scripts.

- **Token Expiry**: Set reasonable token expiration times to minimize the risk of unauthorized access.

- **Secure Communication**: Use HTTPS to encrypt data transmission, preventing token interception.

- **Secret Key Management**: Safeguard the secret key used for signing JWT tokens.

- **Token Revocation**: Implement mechanisms for token revocation if a user logs out or their account is compromised.

In the "Social Waves" backend, security is a top priority, and measures are in place to protect user authentication and data.


## 5. Controllers
Controllers in the "Social Waves" backend play a pivotal role in handling various aspects of the application's business logic. Each controller is responsible for managing specific functionalities and endpoints. In this section, we'll explore the key controllers used in the backend.

## User Controller

The User Controller is responsible for handling user-related operations, including user registration, login, profile updates, and more. Here's an overview of its functionalities:

- **User Registration**: The `registerUser` function allows users to create a new account by providing necessary information such as username, email, and password.

- **User Login**: The `loginUser` function handles user authentication by verifying credentials and issuing a JWT token upon successful login.


## Post Controller

The Post Controller manages user-generated posts and interactions with those posts. It handles functionalities related to creating, updating, deleting, and retrieving posts. Here's an overview of its functionalities:

- **Create a Post**: Users can create new posts using the `createPost` function, providing content, images, and tags.

- **Update a Post**: The `updatePost` function allows users to edit the content or tags of their existing posts.

- **Delete a Post**: Users can remove their posts using the `deletePost` function.

- **Get Posts**: The Post Controller provides functions to retrieve posts, including fetching posts by a specific user or filtering posts by tags.

- **Like and Comment**: Interaction with posts, such as liking and commenting, is also managed through the Post Controller.

## 6. API Documentation
The "Social Waves" backend exposes a set of RESTful API endpoints that enable communication with the frontend and support various functionalities of the application. This section provides comprehensive documentation for the available API endpoints, including request methods, parameters, and response formats.

## API Endpoints

### User-related Endpoints

#### 1. User Registration
- **URL**: `/users/signup`
- **Method**: POST
- **Request Body**:
  - `firstName`: User's username (string, required)
  - `lastName`: User's username (string, required)
  - `email`: User's email address (string, required)
  - `password`: User's password (string, required)
  - `confirmPassword`: User's confirm password (string, required)

- **Response**:
  - Status: 200 Created
  - Body: Jwt Token or Error Message

#### 2. User Login

- **URL**: `/users/signin`
- **Method**: POST
- **Request Body**:
  - `email`: User's email address (string, required)
  - `password`: User's password (string, required)

- **Response**:
  - Status: 200 OK
  - Body: JWT token for authentication or error message.


### Post-related Endpoints

#### 5. Create a Post

- **URL**: `/`
- **Method**: POST
- **Request Body**:
  - `title`: Post Title (string, required)
  - `selectedFile`: Image URLs (string, optional)
  - `tags`: Array of tags (array of strings, optional)
  - `creator` - User id of user logged in (string,required)
  - `message` - User message (string,required)

- **Authentication**: Requires a valid JWT token in the request header.

- **Response**:
  - Status: 201 Created
  - Body: Created post data or error message.

#### 6. Update a Post

- **URL**: `/posts/:id`
- **Method**: PATCH
- **Parameters**: `id` - ID of the post to update (string, required)
- **Request Body**:
  - `title`: Post Title (string, required)
  - `selectedFile`: Image URLs (string, optional)
  - `tags`: Array of tags (array of strings, optional)
  - `message` - User message (string,required)
  
- **Authentication**: Requires a valid JWT token in the request header.

- **Response**:
  - Status: 200 OK
  - Body: Updated post data or error message.

#### 7. Delete a Post

- **URL**: `/posts/:id`
- **Method**: DELETE
- **Parameters**: `id` - ID of the post to delete (string, required)

- **Authentication**: Requires a valid JWT token in the request header.

- **Response**:
  - Status: 200 OK
  - Body: Deletion confirmation or error message.

... and many more.

### Error Responses

In case of errors, the API endpoints return appropriate HTTP status codes and error messages in the response body to provide clear information about the issue.

## Request and Response Examples

For detailed request and response examples for each endpoint, refer to the "Request and Response Examples" section in this documentation.


## 7. Contributing

"Social Waves" welcomes contributions from the developer community to help improve and enhance the backend of the application. Your contributions play a significant role in making the project better and more robust. This section outlines how you can contribute to the backend.

## How to Contribute

Contributing to the "Social Waves" backend is a straightforward process, and we appreciate any contributions, whether they are bug fixes, new features, or improvements to the existing codebase. Here's a step-by-step guide on how to contribute:

1. **Fork the Repository**: Start by forking the official "Social Waves" backend repository on GitHub. This will create a copy of the project under your GitHub account.

2. **Clone the Repository**: Clone your forked repository to your local development environment using the following command:

   ```bash
   git clone https://github.com/deciever002/social-wave-backend.git
   ```

3. **Create a Branch**: Create a new branch for your contributions, naming it appropriately to describe the work you plan to do:

   ```bash
   git checkout -b feature/new-feature
   ```

4. **Make Changes**: Make your desired changes or enhancements to the backend codebase. Ensure that your changes align with the project's goals and guidelines.

5. **Test Your Changes**: Thoroughly test your changes to ensure they work as expected and do not introduce new issues. Write unit tests or integration tests when necessary.

6. **Commit Changes**: Commit your changes with a clear and concise commit message:

   ```bash
   git commit -m "Add new feature: feature description"
   ```

7. **Push Changes**: Push your changes to your forked repository on GitHub:

   ```bash
   git push origin feature/new-feature
   ```

8. **Create a Pull Request**: Open a pull request (PR) on the official "Social Waves" backend repository. Provide a detailed description of your changes, including the purpose, implementation details, and any relevant context.

9. **Review and Collaboration**: Collaborate with maintainers and other contributors to address feedback, review comments, and ensure the quality of your contribution.

10. **Merge and Deployment**: Once your PR is approved, it will be merged into the main codebase, and your contributions will be deployed with the next release.

## Code Style Guidelines

To maintain a consistent codebase, "Social Waves" follows specific code style guidelines. When contributing, please adhere to these guidelines to ensure that your code integrates smoothly:

- Use consistent indentation and formatting.
- Follow naming conventions for variables, functions, and classes.
- Write clear and concise code comments when necessary to explain complex logic or provide context.

## Issue Tracking

Contributors can check the project's issue tracker on GitHub to find tasks, bugs, and features that need attention. If you plan to work on a specific issue, comment on it to let others know you're addressing it.

## Community Guidelines

We encourage open and respectful communication within our community. Be kind and considerate when interacting with other contributors and users. Harassment or disrespectful behavior will not be tolerated.

## We Value Your Contributions

We appreciate your interest in contributing to the "Social Waves" backend and look forward to your valuable contributions. Together, we can make this project even better.

Thank you for being a part of our open-source community!
