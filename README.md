# LunchPad

LunchPad is a full-stack "MERN" personal productivity dashboard built to centralize daily organization. It provides a single interface for managing tasks, scheduling events, building learning roadmaps, managing a user profile, and tracking daily productivity streaks..

## Features

- **Dashboard:** A central overview of daily progress and upcoming priorities.
- **Task Management:** Create, categorize by priority (Low, Medium, High), and toggle completion of daily tasks.
- **Event Management:** Schedule events with specific dates, times, and priority levels.
- **Roadmap Management:** Build custom roadmaps using a hierarchical structure to break down complex goals into manageable modules.
- **Authentication:** Secure user registration, login, and logout flow using JWTs and HTTP-only cookies, supplemented by OTP-based email verification.
- **Profile:** Manage user information including display name, username, and a short bio.
- **Streak Tracking:** A gamified daily login streak system that tracks current and longest streaks to encourage consistent usage.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React

### State Management

- Context API
- useReducer
- useState
- useEffect
- useRef

### Backend

- Node.js
- Express.js
- REST APIs
- JWT (JSON Web Tokens)
- bcryptjs
- Nodemailer

### Database

- MongoDB
- Mongoose

## Architecture

LunchPad follows a standard decoupled Client-Server architecture. The React frontend manages complex state and UI rendering, while communicating with a RESTful Express.js backend that handles business logic, security, and persistence.

```text
Frontend (React)
    ↓
REST API (Axios)
    ↓
Express Routes
    ↓
Middleware (JWT Auth)
    ↓
Controllers
    ↓
Mongoose Models
    ↓
MongoDB (Atlas)
```

## Project Structure

The project is structured as a monorepo containing both the client and backend codebases.

```text
lunchpad/
├── backend/            # Express.js REST API
│   ├── config/         # Database connection setup
│   ├── controller/     # Route handlers and business logic
│   ├── middleware/     # Authentication and route protection
│   ├── model/          # Mongoose schemas and data models
│   ├── routes/         # Express API route definitions
│   └── services/       # External service integrations (Nodemailer)
└── client/             # React Frontend
    ├── src/
    │   ├── components/ # Reusable UI components and Protected Routes
    │   ├── features/   # Domain-specific logic (Auth, Tasks, Roadmaps, etc.)
    │   ├── pages/      # Top-level route views (Dashboard, Login, etc.)
    │   └── utils/      # Helper functions (Date formatting, etc.)
```

## API Endpoints

### Authentication

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/send-verify-otp`
- `POST /auth/verify-email`
- `POST /auth/send-reset-otp`
- `POST /auth/reset-password`

### Tasks

- `GET /task/get-task`
- `POST /task/add-task`
- `PUT /task/update-task/:id`
- `DELETE /task/delete-task/:id`

### Events

- `GET /event/get-event`
- `POST /event/add-event`
- `DELETE /event/delete-event/:id`

### Roadmaps

- `GET /roadmap/get-roadmap`
- `PUT /roadmap/save-roadmap`

### Profile & Streaks

- `GET /user/profile`
- `PUT /user/profile`
- `GET /user/streak`
- `PUT /user/streak`

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB cluster (or local instance)
- A Gmail account with an App Password (for OTP emails)

### 1. Clone the repository

```bash
git clone https://github.com/willy-Mallai/lunchpad.git
cd lunchpad
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup the Frontend

Open a new terminal window:

```bash
cd client
npm install
```

Create a `.env` file in the `client` folder:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

## What I Learned

Building LunchPad gave me hands-on experience taking a React application from a frontend-only project to a full-stack application with authentication, API integration, and persistent data.

### Frontend Development

- **Feature-Based Architecture:** Organized the React application around features such as authentication, tasks, events, roadmaps, and settings instead of grouping everything only by file type.
- **State Management:** Used the Context API, `useReducer`, and React hooks to manage shared and feature-specific application state.
- **Recursive Components:** Built recursive React components to render the hierarchical Roadmap structure, allowing the UI to handle multiple levels of nested data.
- **Protected Routes:** Implemented protected frontend routes that prevent unauthenticated users from accessing application pages.
- **API Integration:** Learned how to connect a React frontend with a REST API and handle asynchronous operations, loading states, and errors.

### Backend Development

- **REST API Design:** Built REST APIs using Node.js and Express and learned how to structure routes and controllers around application features.
- **Middleware:** Created reusable middleware for authentication and request processing.
- **Authentication:** Learned how authentication works across the frontend and backend, including sending credentials with requests and protecting API routes.
- **Full-Stack Integration:** Connected the React frontend, Express backend, and MongoDB database into a complete application flow.

### Database & Data Modeling

- **MongoDB & Mongoose:** Learned how to design MongoDB documents and work with Mongoose schemas and models.
- **ObjectId References:** Learned how to associate application data with authenticated users using MongoDB ObjectIds.
- **Data Persistence:** Moved application data from frontend-only state to persistent database storage.
- **CRUD Operations:** Implemented database operations for creating, reading, updating, and deleting application data where required by each feature.

### Authentication & Security

- **JWT Authentication:** Learned how JSON Web Tokens can be used to authenticate users and protect backend routes.
- **HTTP-Only Cookies:** Used HTTP-only cookies to store authentication tokens instead of exposing them directly to client-side JavaScript.
- **Password Hashing:** Learned how to securely hash user passwords using `bcryptjs` before storing them in the database.
- **Email Verification:** Integrated Nodemailer to send OTPs for verifying user email addresses.

### Overall Full-Stack Development

The biggest takeaway from building LunchPad was understanding how the different parts of a full-stack application work together:

```text
React
  ↓
API Request
  ↓
Express Route
  ↓
Middleware
  ↓
Controller
  ↓
Mongoose
  ↓
MongoDB
  ↓
API Response
  ↓
React State / UI
```

## Challenges

- **Managing Hierarchical Data:** Designing the state structure and UI components to handle the deeply nested Roadmap feature required careful planning. I had to ensure that the frontend could effectively render n-levels deep while still being easily updated and persisted back to MongoDB in a single document update.
- **Cross-Origin Authentication:** Configuring the backend to securely accept cross-origin requests from the frontend while simultaneously allowing HTTP-only cookies to pass through involved deeply understanding CORS policies and cookie `SameSite` / `Secure` attributes.
- **Transitioning from Local State to API Persistence:** Moving the application from a purely local `useReducer` state to an asynchronous API-backed model required rewriting how the application handles data initialization, loading spinners, and network errors.

## Future Improvements

- Implement profile image uploads via cloud storage.
- Add advanced dashboard analytics and productivity graphs.
- Improve event filtering and add push notifications or email reminders for upcoming deadlines.

## License

This project is for personal and educational use.
