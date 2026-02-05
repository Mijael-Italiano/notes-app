function NotesList({
  notes,
  selectedNoteId,
  onSelect,
  onDelete,
  onArchive,
}) {
  return (
    <div style={{ borderRight: "1px solid #ddd", padding: "10px" }}>
      <h3>Notas</h3>

      {notes.length === 0 && (
        <p style={{ color: "#666" }}>No hay notas</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => onSelect(note)}
            style={{
              padding: "8px",
              marginBottom: "6px",
              cursor: "pointer",
              backgroundColor:
                note.id === selectedNoteId ? "#eef" : "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{note.title}</span>

            <div style={{ display: "flex", gap: "6px" }}>
              {/* ARCHIVAR */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(note);
                }}
                style={{
                  background: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                📦
              </button>

              {/* ELIMINAR */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note);
                }}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;