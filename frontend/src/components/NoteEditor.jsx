import { useEffect, useState } from "react";

/* =========================
   HELPERS
========================= */
function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString();
}

function NoteEditor({ note, categories = [], onSave, onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content ?? "");
      setCategoryId(note.categoryId ?? null);
    } else {
      setTitle("");
      setContent("");
      setCategoryId(null);
    }
  }, [note]);

  function handleSave() {
    if (!note) return;

    const hasChanges =
      title !== note.title ||
      content !== (note.content ?? "") ||
      categoryId !== note.categoryId;

    if (!hasChanges) {
      alert("No changes to save");
      return;
    }

    onSave({
      ...note,
      title,
      content,
      categoryId,
    });
  }

  function handleCreate() {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onCreate({
      title,
      content,
      categoryId,
    });
  }

  /* =========================
     CREATE NOTE
  ========================= */
  if (!note) {
    return (
      <div style={{ padding: "10px" }}>
        <h3>New note</h3>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "8px" }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          style={{ width: "100%", marginBottom: "8px" }}
        />

        <select
          value={categoryId ?? ""}
          onChange={(e) =>
            setCategoryId(
              e.target.value === "" ? null : Number(e.target.value)
            )
          }
          style={{ width: "100%", marginBottom: "12px" }}
        >
          <option value="">No category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={handleCreate}>
          Create note
        </button>
      </div>
    );
  }

  /* =========================
     EDIT NOTE
  ========================= */
  return (
    <div style={{ padding: "10px" }}>
      <h3>Edit note</h3>

      {/* DATES */}
      <div
        style={{
          fontSize: "12px",
          color: "#666",
          marginBottom: "10px",
        }}
      >
        <div>Created: {formatDate(note.createdAt)}</div>
        <div>
          Last modified:{" "}
          {note.modifiedAt
            ? formatDate(note.modifiedAt)
            : "—"}
        </div>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "8px" }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        style={{ width: "100%", marginBottom: "8px" }}
      />

      {/* CATEGORY SELECT */}
      <select
        value={categoryId ?? ""}
        onChange={(e) =>
          setCategoryId(
            e.target.value === "" ? null : Number(e.target.value)
          )
        }
        style={{ width: "100%", marginBottom: "12px" }}
      >
        <option value="">No category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button onClick={handleSave}>
        Save changes
      </button>
    </div>
  );
}

export default NoteEditor;