import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import ArchivedNotesList from "./components/ArchivedNotesList";
import CategoriesManager from "./components/CategoriesManager";

import {
  getActiveNotes,
  getArchivedNotes,
  createNote,
  updateNoteTitle,
  updateNoteContent,
  updateNoteCategory,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "./services/notesApi";

import { getCategories } from "./services/categoriesApi";

/*
  Normalizes backend note structure to simplify frontend state handling.
  Extracts categoryId from nested category object.
*/
function normalizeNotes(notes) {
  return notes.map((n) => ({
    ...n,
    categoryId: n.category ? n.category.id : null,
  }));
}

function App() {
  /*
    Application state:
    - notes / archivedNotes: active and archived collections
    - categories: available note categories
    - selectedNote: note currently being edited
    - selectedCategoryId: filter state
    - loading: initial loading indicator
    - showArchived: UI mode toggle
  */
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  /*
    Initial data load:
    Fetches active notes and categories in parallel.
  */
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

      setNotes(normalizeNotes(notesData));
      setCategories(categoriesData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  /*
    Reloads active notes from backend.
  */
  async function loadNotes() {
    try {
      const data = await getActiveNotes();
      setNotes(normalizeNotes(data));
    } catch (error) {
      alert(error.message);
    }
  }

  /*
    Loads archived notes when archived view is enabled.
  */
  async function loadArchivedNotes() {
    try {
      const data = await getArchivedNotes();
      setArchivedNotes(normalizeNotes(data));
    } catch (error) {
      alert(error.message);
    }
  }

  /*
    Refreshes categories and resets active category filter.
  */
  async function reloadCategories() {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      setSelectedCategoryId(null);
      await loadNotes();
    } catch (error) {
      alert(error.message);
    }
  }

  /*
    Creates a new note and refreshes active list.
  */
  async function handleCreate(noteData) {
    try {
      await createNote(
        noteData.title,
        noteData.content,
        noteData.categoryId
      );
      await loadNotes();
      setSelectedNote(null);
    } catch (error) {
      alert(error.message);
    }
  }

  /*
    Updates only modified fields to avoid unnecessary API calls.
  */
  async function handleSave(updatedNote) {
    try {
      if (updatedNote.title !== selectedNote.title) {
        await updateNoteTitle(updatedNote.id, updatedNote.title);
      }

      if ((updatedNote.content ?? "") !== (selectedNote.content ?? "")) {
        await updateNoteContent(updatedNote.id, updatedNote.content);
      }

      if (updatedNote.categoryId !== selectedNote.categoryId) {
        await updateNoteCategory(
          updatedNote.id,
          updatedNote.categoryId
        );
      }

      await loadNotes();
      setSelectedNote(null);
    } catch (error) {
      alert(error.message);
    }
  }

  /*
    Deletes a note after user confirmation.
  */
  async function handleDelete(note) {
    if (!window.confirm("Delete this note?")) return;

    try {
      await deleteNote(note.id);
      await loadNotes();
      setSelectedNote(null);
    } catch (error) {
      alert(error.message);
    }
  }

  /*
    Archives a note after user confirmation.
  */
  async function handleArchive(note) {
    if (!window.confirm("Archive this note?")) return;

    try {
      await archiveNote(note.id);
      await loadNotes();
      setSelectedNote(null);
    } catch (error) {
      alert(error.message);
    }
  }

  /*
    Restores an archived note and refreshes both lists.
  */
  async function handleUnarchive(note) {
    try {
      await unarchiveNote(note.id);
      await loadNotes();
      await loadArchivedNotes();
    } catch (error) {
      alert(error.message);
    }
  }

  /*
    Client-side filtering by selected category.
  */
  const filteredNotes = selectedCategoryId
    ? notes.filter((n) => n.categoryId === selectedCategoryId)
    : notes;

  /*
    Main layout:
    - Left panel: categories + active notes OR archived notes
    - Right panel: note editor (only in active mode)
  */
  return (
    <div style={{ height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={() => {
          const next = !showArchived;
          setShowArchived(next);
          if (next) loadArchivedNotes();
        }}
        style={{ margin: "10px" }}
      >
        {showArchived ? "View active" : "View archived"}
      </button>

      <div
        style={{
          display: "flex",
          height: "calc(100% - 50px)",
        }}
      >
        {/* Left panel */}
        <div
          style={{
            width: showArchived ? "100%" : "40%",
            borderRight: showArchived ? "none" : "1px solid #ddd",
            overflowY: "auto",
            padding: showArchived ? "16px" : "0",
          }}
        >
          {showArchived ? (
            <ArchivedNotesList
              notes={archivedNotes}
              onUnarchive={handleUnarchive}
            />
          ) : (
            <>
              <CategoriesManager
                categories={categories}
                onCategoriesChanged={reloadCategories}
              />

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
            </>
          )}
        </div>

        {/* Right panel (active mode only) */}
        {!showArchived && (
          <div
            style={{
              width: "60%",
              padding: "16px",
              overflowY: "auto",
            }}
          >
            {selectedNote && (
              <button
                onClick={() => setSelectedNote(null)}
                style={{
                  marginBottom: "12px",
                  background: "#2ecc71",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                ➕ New note
              </button>
            )}

            {loading ? (
              <p>Loading...</p>
            ) : (
              <NoteEditor
                note={selectedNote}
                categories={categories}
                onSave={handleSave}
                onCreate={handleCreate}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
