function NotesList({
  notes,
  categories,
  selectedCategoryId,
  onCategoryFilterChange,
  selectedNoteId,
  onSelect,
  onDelete,
  onArchive,
  onCategoryChange,
}) {
  return (
    <div style={{ padding: "12px" }}>
      <h3 style={{ marginBottom: "8px" }}>Notas</h3>

      <div style={{ marginBottom: "12px" }}>
        <select
          value={selectedCategoryId ?? ""}
          onChange={(e) => {
            const value =
              e.target.value === "" ? null : Number(e.target.value);
            onCategoryFilterChange(value);
          }}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {notes.length === 0 && <p>No hay notas</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => onSelect(note)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              backgroundColor:
                note.id === selectedNoteId ? "#eef" : "#fff",
              border: "1px solid #ccc",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{note.title}</strong>

              <select
                value={note.categoryId ?? ""}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const categoryId =
                    e.target.value === ""
                      ? null
                      : Number(e.target.value);

                  onCategoryChange(note.id, categoryId);
                }}
              >
                <option value="">Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(note);
                }}
              >
                📦
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note);
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
