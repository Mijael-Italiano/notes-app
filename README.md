# Notes Application

Full-stack Notes Management Application built with:

- ASP.NET Core 8 (Backend API)
- PostgreSQL (Database)
- React + Vite (Frontend)
- Docker & Docker Compose (Containerization)

The project is fully containerized and can be started with a single command.

---

## 🚀 Run with Docker

### Requirements

The following software must be installed:

- Docker
- Docker Compose

### Start the application

```bash
docker compose up --build
```

After startup:

- Frontend → http://localhost:5173
- Backend (Swagger) → http://localhost:8080/swagger

To stop the application:

```bash
docker compose down
```

---

## 🖥️ Operating System Support

This project works on the following systems:

### Linux
Requirements:
- Docker
- Docker Compose

### macOS
Requirements:
- Docker Desktop

### Windows
Requirements:
- Docker Desktop
- WSL2 enabled

---

## 🏗️ Architecture

### Backend
- Clean architecture style separation:
  - Domain
  - Application
  - Infrastructure
  - API
- Entity Framework Core
- RESTful endpoints

### Frontend
- React (functional components)
- Vite
- Fetch API for HTTP communication
- State managed with React hooks

### Database
- PostgreSQL 16
- Docker volume for persistence

---

## 📂 Project Structure

```
Notes/
│
├── docker-compose.yml
├── frontend/
└── NotesAPI/
```

---

## 📌 Features

- Create notes
- Edit title/content/category
- Archive / Unarchive notes
- Category management
- Filter notes by category
- Persistent storage

---

## 📦 Tech Stack

- .NET 8
- PostgreSQL
- React 18
- Vite
- Docker

---

## 📝 Author

Bruno Mijael Italiano