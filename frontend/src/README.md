# Notes App – Frontend

Frontend of a notes application developed as a **Single Page Application (SPA)**.  
It consumes a REST API to manage active and archived notes.

This project corresponds to **Phase 1** of the *Full Stack Implementation Exercise*.

---

## 🚀 Features (Phase 1)

- Create notes
- Edit note title and content
- Delete notes
- Archive and unarchive notes
- List active notes
- List archived notes

---

## 🧱 Architecture

- SPA built with **React**
- Communication with the backend through a **REST API**
- Clear separation of responsibilities:
  - `components/`: UI components
  - `services/`: API access layer (`notesApi`)
  - `App.jsx`: main state and application flow

---

## 🛠️ Technologies

- **Node.js**: 18.x
- **npm**: 9.x
- **React**: 18
- **Vite** (development environment)
- **JavaScript (ES6+)**
- **HTML / CSS**

---

## 📦 Requirements

Before running the project, make sure you have:

- Node.js >= 18
- npm >= 9
- The backend application running (see Backend section)

---

## ▶️ Running the project

1. Navigate to the frontend folder:
   ```bash
   cd frontend
Install dependencies:

npm install
Start the development server:

npm run dev
Open the browser at:

http://localhost:5173
🔌 Backend
The frontend expects the backend API to be available at:

https://localhost:7043/api/Notes
Used endpoints:

GET /active

GET /archived

POST /

PUT /{id}/title

PUT /{id}/content

POST /{id}/archive

POST /{id}/unarchive

DELETE /{id}

🧠 Design Decisions
Note titles are not required to be unique, as this was not a functional requirement.

Note updates are split into separate operations (title and content) to keep actions explicit.

Phase 2 (tags and filtering) was not implemented, focusing on a solid and complete Phase 1.

📌 Project Status
✅ Phase 1 completed

⏳ Phase 2 not implemented (optional)

👤 Author
Developed as a full stack technical exercise.