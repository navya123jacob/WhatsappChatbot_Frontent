
---

### Frontend README

```markdown
# WhatsApp Chatbot Frontend

This project is the frontend of a WhatsApp chatbot application built using React. It allows users to register, verify OTPs, and interact with the chatbot.

## Features

- **User Registration**: Allows users to register via a form or by scanning a QR code to interact with the WhatsApp chatbot.
- **OTP Verification**: Supports OTP-based verification for user registration.
- **Responsive Design**: Ensures a good user experience across different screen sizes.
- **Secure Authentication**: Implements secure authentication with JWT and cookies.

## Requirements

- Node.js
- React
- Redux Toolkit (for state management)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/navya123jacob/WhatsappChatbot_Frontent.git
    cd your-repo/frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the application:**

    ```bash
    npm start
    ```

    The application will start on `http://localhost:3000`.

## Project Structure

- **/src**
  - **Components**: Contains reusable components like Navbar, OTP inputs, etc.
  - **Pages**: Contains the main pages like Register and Login.
  - **Store**: Redux store and slices for managing state.
  - **Styles**: CSS stylesheets for the application.

## Redux State Management

This project uses Redux Toolkit's RTK Query for managing API calls and state. The key slices include:

- **authSlice**: Handles user authentication state.
- **apiSlice**: Manages API calls using RTK Query.

## API Endpoints

The frontend interacts with the backend through the following API endpoints.Example:

- **Register User**: `POST /api/auth/register`
- **Verify OTP**: `POST /api/auth/verify`
- **Generate QR Code**: `GET /api/chatbot/qrcode`


