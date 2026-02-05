import { useEffect, useState } from "react";

function NoteEditor({ note, onSave, onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content ?? "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  function handleSave() {
    if (!note) return;

    const hasChanges =
      title !== note.title || content !== (note.content ?? "");

    if (!hasChanges) {
      alert("No hay cambios para guardar");
      return;
    }

    const confirmSave = window.confirm(
      "¿Desea guardar los cambios?"
    );

    if (!confirmSave) return;

    onSave({
      ...note,
      title,
      content,
    });
  }

  function handleCreate() {
    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    onCreate({
      title,
      content,
    });
  }

  if (!note) {
    return (
      <div style={{ padding: "10px" }}>
        <h3>Nueva nota</h3>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "8px" }}
        />

        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          style={{ width: "100%", marginBottom: "8px" }}
        />

        <button onClick={handleCreate}>Crear nota</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "10px" }}>
      <h3>Editar nota</h3>

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

      <button onClick={handleSave}>Guardar cambios</button>
    </div>
  );
}

export default NoteEditor;