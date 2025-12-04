# Mini Chat App

A full-stack team chat application built with the MERN stack (MongoDB, Express, React/Next.js, Node.js) and Socket.io for real-time capabilities.

## Features

- **Authentication**: Secure signup and login using JWT.
- **Workspaces**: Create and join workspaces to organize teams.
- **Channels**: Real-time text channels within workspaces.
- **Real-time Messaging**: Instant messaging powered by Socket.io.
- **User Profiles**: Customizable user profiles with avatars.
- **Modern UI**: Sleek, dark-themed interface built with Tailwind CSS and Shadcn UI.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Real-time**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-chat-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mini-chat-app/
├── backend/                # Express backend
│   ├── src/
│   │   ├── controller/     # Request handlers
│   │   ├── middleware/     # Auth and error middleware
│   │   ├── model/          # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── sockets/        # Socket.io handlers
│   └── ...
├── frontend/               # Next.js frontend
│   ├── app/                # App router pages
│   ├── components/         # React components
│   ├── lib/                # Utilities (API, Socket)
│   ├── store/              # Zustand stores
│   └── ...
└── README.md
```
