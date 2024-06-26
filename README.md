# Chatify

[GitHub Repository](https://github.com/abhiabhishektr)
[GitHub Repository](https://github.com/mohammedshibilpv0)


### FrontEnd File Structure

- **/components**: Directory containing reusable React components used throughout the application.
  - `UserProfile.jsx`: Component for displaying user profile information.
  - `AdminDashboard.jsx`: Component for displaying the admin dashboard.
  - `LoginPage.jsx`: Component for user login functionality.
  - `App.jsx`: Main component serving as the entry point of the application.

- **/pages**: Directory containing React components representing different pages or views of the    application.
  - `UserProfilePage.jsx`: Component representing the user profile page.
  - `AdminPage.jsx`: Component representing the admin page.
  - `LoginPage.jsx`: Component representing the login page.
  - `ChatPage.jsx`: Component representing the page where users can chat together.

- **/viewmodels**: Directory containing view model files or state management related files.
  - `UserViewModel.js`: View model for managing user-related data and operations.
  - `AdminViewModel.js`: View model for managing admin-related data and operations.
  - `store.js`: Redux store file or Context API provider for managing application-wide state.

- **/styles**: Directory containing CSS files for styling the components.
  - `styles.css`: (for Each componet file stylings.).

FrontEnd Framework updated by [Abhishek T R](https://github.com/abhiabhishektr).

# Chatify

Chatify is an open-source project aimed at creating a user-friendly chat application. This repository contains the source code and documentation for the project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Introduction

Chatify is designed to provide seamless communication with real-time messaging, user authentication, and an intuitive user interface.

## Features

- Real-time messaging
- User authentication and authorization
- Responsive design
- Emoji support

## Installation

To get a local copy up and running, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/abhiabhishektr/Chatify.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Chatify
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the development server:
    ```sh
    npm start
    ```

## Usage

Once the server is running, you can access the application at `http://localhost:3000`. Register an account or log in to start chatting.

## Contributing

We welcome contributions to Chatify! Follow these steps to contribute:

1. **Fork the Repository**:
    - Navigate to the [original repository](https://github.com/ATHULPRATHAPPK/Chatify).
    - Click the "Fork" button to create a copy of the repository under your own GitHub account.

2. **Clone Your Fork**:
    - Open your terminal or command prompt.
    - Clone your forked repository to your local machine:
      ```sh
      git clone https://github.com/<your-github-id>/Chatify.git
      eg: git clone https://github.com/abhiabhishektr/Chatify
      ```

3. **Navigate to the Repository**:
    - Change your directory to the repository folder:
      ```sh
      cd Chatify
      ```

4. **Set Upstream Repository**:
    - Add the original repository as an upstream remote to keep your fork up to date:
      ```sh
      git remote add upstream https://github.com/ATHULPRATHAPPK/Chatify.git
      ```

5. **Create a New Branch**:
    - Create a new branch for your work:
      ```sh
      git checkout -b feature-branch
      ```
    - Replace `feature-branch` with a descriptive name for your branch.

6. **Make Changes**:
    - Make the necessary changes to the codebase.

7. **Commit Your Changes**:
    - Stage your changes:
      ```sh
      git add .
      ```
    - Commit your changes with a descriptive message:
      ```sh
      git commit -m "Description of the changes"
      ```

8. **Push Your Changes**:
    - Push your branch to your forked repository on GitHub:
      ```sh
      git push origin feature-branch
      ```

9. **Create a Pull Request**:
    - Go to your forked repository on GitHub: https://github.com/abhiabhishektr/Chatify
    - Click on "Compare & pull request".
    - Provide a title and description for your pull request.
    - Submit the pull request.

10. **Respond to Feedback**:
    - The repository maintainers may request changes. Be prepared to respond and make additional commits to your branch if necessary.

11. **Keep Your Fork Updated**:
    - Periodically update your fork with the latest changes from the original repository:
      ```sh
      git fetch upstream
      git checkout main
      git merge upstream/main
      git push origin main
      ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

Readme updated by [Abhishek T R](https://github.com/abhiabhishektr).
