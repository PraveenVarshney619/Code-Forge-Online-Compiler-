# Code-Forge (Online Compiler)

**Code Forge Live** is a cutting-edge, collaborative online code editor engineered with Next.js, Express.js, and Websockets. It offers a seamless and real-time coding experience, enabling multiple users to code together in real-time.

## Features
- **Collaborative Coding:** Facilitates real-time collaborative coding among multiple users.
- **Backend Integration:** Built with Express and Node.js for robust backend functionalities.
- **Real-time Communication:** Leverages WebSockets to enhance real-time collaboration.
- **Web Scraping:** Includes web scraping capabilities to gather coding questions from various online sources.
- **REST API:** Efficiently utilizes REST APIs for comprehensive project development.

## Technologies Used
- **Frontend:** Next.js, TailWind CSS
- **Backend:** Node.js, Express.js
- **Real-time Communication:** WebSockets
- **Additional Tools:** Web Scraping

## Getting Started

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install frontend dependencies:
    ```bash
    npm install --force
    ```
3. Start the frontend development server:
    ```bash
    npm run dev -- -p 3005
    ```
   _Note: The default port 3000 is used for the backend._

### Backend Setup
1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Install backend dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    node server.js
    ```

