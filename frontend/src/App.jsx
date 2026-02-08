import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import ArchivedNotesList from "./components/ArchivedNotesList";

import {
  getActiveNotes,
  getArchivedNotes,
  createNote,
  updateNoteTitle,
  updateNoteContent,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "./services/notesApi";

import { getCategories } from "./services/categoriesApi";

function App() {
  /* =========================
     ESTADOS
  ========================= */

  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  /* =========================
     CARGA INICIAL
  ========================= */

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    setLoading(true);
    try {
      const [notesData, categoriesData] = await Promise.all([
        getActiveNotes(),
        getCategories(),
      ]);

      setNotes(notesData);
      setCategories(categoriesData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadNotes() {
    try {
      const data = await getActiveNotes();
      setNotes(data);
    } catch (error) {
      alert(error.message);
    }
  }

  async function loadArchivedNotes() {
    try {
      const data = await getArchivedNotes();
      setArchivedNotes(data);
    } catch (error) {
      alert(error.message);
    }
  }

  /* =========================
     CRUD
  ========================= */

  async function handleCreate(noteData) {
    try {
      await createNote(noteData.title, noteData.content);
      await loadNotes();
      setSelectedNote(null);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSave(updatedNote) {
    try {
      if (updatedNote.title !== selectedNote.title) {
        await updateNoteTitle(updatedNote.id, updatedNote.title);
      }

      if ((updatedNote.content ?? "") !== (selectedNote.content ?? "")) {
        await updateNoteContent(updatedNote.id, updatedNote.content);
      }

      await loadNotes();
      setSelectedNote(null);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete(note) {
    if (!window.confirm("¿Eliminar la nota?")) return;

    try {
      await deleteNote(note.id);
      await loadNotes();

      if (selectedNote?.id === note.id) {
        setSelectedNote(null);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleArchive(note) {
    if (!window.confirm("¿Archivar la nota?")) return;

    try {
      await archiveNote(note.id);
      await loadNotes();
      setSelectedNote(null);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleUnarchive(note) {
    try {
      await unarchiveNote(note.id);
      await loadNotes();
      await loadArchivedNotes();
    } catch (error) {
      alert(error.message);
    }
  }

  /* =========================
     FILTRO POR CATEGORÍA
  ========================= */

  const filteredNotes = selectedCategoryId
    ? notes.filter((n) => n.categoryId === selectedCategoryId)
    : notes;

  /* =========================
     RENDER
  ========================= */

  return (
    <div style={{ height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* BOTÓN ARCHIVADAS */}
      <button
        onClick={() => {
          const next = !showArchived;
          setShowArchived(next);
          if (next) loadArchivedNotes();
        }}
        style={{ margin: "10px" }}
      >
        {showArchived ? "Ver activas" : "Ver archivadas"}
      </button>

      <div style={{ display: "flex", height: "calc(100% - 50px)" }}>
        {/* PANEL IZQUIERDO */}
        <div
          style={{
            width: "32%",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
          }}
        >
          {showArchived ? (
            <ArchivedNotesList
              notes={archivedNotes}
              onUnarchive={handleUnarchive}
            />
          ) : (
            <NotesList
              notes={filteredNotes}
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onCategoryFilterChange={setSelectedCategoryId}
              selectedNoteId={selectedNote?.id}
              onSelect={setSelectedNote}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          )}
        </div>

        {/* PANEL DERECHO */}
        <div
          style={{
            width: "68%",
            padding: "16px",
            overflowY: "auto",
          }}
        >
          {/* BOTÓN NUEVA NOTA */}
          <button
            onClick={() => setSelectedNote(null)}
            style={{
              marginBottom: "12px",
              background: "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            ➕ Nueva nota
          </button>

          {loading ? (
            <p>Cargando...</p>
          ) : (
            <NoteEditor
              note={selectedNote}
              onSave={handleSave}
              onCreate={handleCreate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;