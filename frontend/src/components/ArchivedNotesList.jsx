function ArchivedNotesList({ notes, onUnarchive }) {
  return (
    <div style={{ padding: "10px" }}>
      <h3>Archived</h3>

      {notes.length === 0 && (
        <p style={{ color: "#666" }}>
          No archived notes
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              padding: "8px",
              marginBottom: "6px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{note.title}</span>

            <button
              onClick={() => onUnarchive(note)}
              style={{
                background: "#2ecc71",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              title="Unarchive"
            >
              ↩️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArchivedNotesList;