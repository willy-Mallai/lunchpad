# LunchPad

LunchPad is a personal productivity dashboard built with React and Vite. It brings together task tracking, event scheduling, roadmap planning, profile management, and activity streaks inside one clean interface.

The current version is a frontend-focused prototype. It demonstrates the full user interface and core interactions, while future development is planned around a real backend using MongoDB.

## Overview

LunchPad is designed as a student and developer productivity workspace. The app helps users:

- manage daily tasks
- schedule and review events
- organize learning goals in a roadmap tree
- track personal activity streaks
- manage profile information from a settings page

The app uses React Context and `useReducer` for shared state management across major feature areas.

## Why I Built LunchPad

I wanted to build a project that combined several React concepts I had been learning, including Context API, useReducer, React Router, and recursive components. Rather than building separate small projects, I decided to combine them into a single productivity dashboard that I can continue expanding into a full MERN application.

## What I Learned

While building LunchPad I practiced:

- Structuring a larger React application using feature-based folders.
- Managing complex shared state with Context API and useReducer.
- Building recursive components for nested roadmap data.
- Designing reusable UI components.
- Planning an application that can later transition from local state to a backend API.

## Features

### Dashboard

- summary cards for pending tasks, events, and roadmap milestones
- welcome header with streak and profile context
- quick overview widgets for current tasks, events, and roadmap progress
- profile preview card linked to settings

### Task Management

- add new tasks
- assign priority levels
- mark tasks as complete
- edit task titles
- delete tasks
- view progress with completed vs total task count

### Event Management

- add events for a selected date
- include title, description, time, and priority
- browse dates through a calendar UI
- display event indicators on calendar dates
- filter events by all, this month, or selected day
- delete existing events

### Roadmap Management

- create top-level milestones
- create child modules inside milestones
- create nested tasks inside modules
- edit roadmap task titles
- mark roadmap tasks complete
- delete milestones, modules, and tasks
- view progress by module and milestone

### Settings and Profile

- update profile details such as name, email, username, and bio
- upload a profile image through the UI
- view activity streak stats
- display profile and streak data in shared layout areas

## Tech Stack

### Frontend

- React 19
- Vite
- JavaScript (ES6+)
- Tailwind CSS 4

### State Management & React Hooks

- React Context API (Global State)
- useReducer (Complex State Management)
- useState (Local Component State)
- useEffect (Side Effects & Synchronization)
- useRef (DOM References & Persistent Values)

### Routing

- React Router 7

### UI

- React Calendar
- Lucide React (Icons)

### Tooling

- ESLint
- npm
- Git

## Project Structure

```text
src/
  features/
    dashboard/
    events/
    home/
    roadMap/
    setting/
    task/
  pages/
  styles/
  App.jsx
  main.jsx
```

### Main Feature Areas

- `dashboard`: summary widgets and landing overview
- `task`: task creation, listing, editing, and completion flow
- `events`: calendar-based event scheduling and filtering
- `roadMap`: nested milestone and module planning system
- `setting`: profile and streak management
- `home`: shared app shell including header, navigation, and outlet layout

## Routing

LunchPad uses a shared layout with nested routes:

- `/dashboard`
- `/task`
- `/event`
- `/roadMap`
- `/setting`

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Then open the local Vite development URL shown in the terminal.

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the app for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint across the project.

## Current Status

This project is currently a frontend-only application.

State is handled locally with React Context and reducers, which means:

- data does not persist after refresh
- there is no user authentication yet
- there is no API integration yet
- profile saving is only simulated in the current UI
- uploaded profile images are not stored permanently

The app is best understood as a product prototype or frontend foundation for a full-stack productivity platform.

## Backend Vision

The planned next step for LunchPad is a full backend implementation using MongoDB.

### Proposed Backend Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Cloudinary or AWS S3 for profile image storage

### Why MongoDB Fits This Project

MongoDB is a strong fit for LunchPad because:

- roadmap data is naturally hierarchical
- flexible schemas are useful while features are still evolving
- profile, streak, and productivity data can be modeled cleanly in documents
- it works well with a React plus Node full-stack architecture

## Planned MongoDB Data Models

### User

- name
- email
- username
- password hash
- bio
- profile image URL
- streak data

### Task

- userId
- title
- priority
- completed
- timestamps

### Event

- userId
- title
- description
- date
- time
- priority
- timestamps

### Roadmap

- userId
- title
- modules

### Example Roadmap Structure

```json
{
  "title": "Frontend Development",
  "children": [
    {
      "title": "React",
      "children": [
        {
          "title": "Context API",
          "priority": "High",
          "completed": false
        },
        {
          "title": "useReducer",
          "priority": "Medium",
          "completed": true
        }
      ]
    },
    {
      "title": "JavaScript",
      "children": [
        {
          "title": "Promises",
          "priority": "High",
          "completed": true
        }
      ]
    }
  ]
}
```

## Future Development

This project is far from finished. My goal is to gradually evolve LunchPad from a frontend prototype into a complete MERN application. As I continue learning backend development, I plan to replace the current local state management with a REST API, persist data in MongoDB, implement authentication, and add features such as cloud-based profile image uploads, reminders, and improved dashboard analytics. I also plan to improve the application's reliability by adding proper loading states, error handling, and automated testing.

Planned improvements include:

- Building an Express.js REST API to replace local state with persistent data.
- Integrating MongoDB and Mongoose for storing tasks, events, roadmaps, profiles, and streaks.
- Adding secure user authentication using JWT and password hashing.
- Implementing profile image uploads using Cloudinary.
- Synchronizing dashboard statistics with backend data.
- Improving event filtering, reminders, and notifications.
- Adding loading, error, and empty states for asynchronous API requests.
- Writing automated tests for reducers, components, and backend routes.

## Suggested API Direction

Possible backend route structure:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id

GET    /api/events
POST   /api/events
PATCH  /api/events/:id
DELETE /api/events/:id

GET    /api/roadmaps
POST   /api/roadmaps
PATCH  /api/roadmaps/:id
DELETE /api/roadmaps/:id

GET    /api/profile
PATCH  /api/profile
PATCH  /api/profile/photo
```

## Notes

- The current event seed data included in the frontend is sample data for UI development.
- The current implementation focuses on UX, component structure, and state flow before backend integration.
- LunchPad is a good foundation for converting into a full MERN-style project.

## Authoring Direction

The most valuable next milestone is:

1. add backend scaffolding
2. connect MongoDB with Mongoose models
3. introduce authentication
4. replace local reducer-only state with API-backed persistence

## License

This project is currently for personal or educational use unless you choose to add a separate license.
