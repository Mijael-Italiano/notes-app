/*
  Displays active notes list with category filter.
  Handles selection, archive and delete actions via callbacks.
*/
function NotesList({
  notes,
  categories,
  selectedCategoryId,
  onCategoryFilterChange,
  selectedNoteId,
  onSelect,
  onDelete,
  onArchive,
}) {
  return (
    <div style={{ padding: "12px" }}>
      <h3 style={{ marginBottom: "8px" }}>Notes</h3>

      {/* Category filter (client-side) */}
      <div style={{ marginBottom: "12px" }}>
        <select
          value={selectedCategoryId ?? ""}
          onChange={(e) => {
            const value =
              e.target.value === "" ? null : Number(e.target.value);
            onCategoryFilterChange(value);
          }}
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Empty state */}
      {notes.length === 0 && <p>No notes</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => {
          const categoryName =
            categories.find((c) => c.id === note.categoryId)?.name ??
            "No category";

          const isSelected = note.id === selectedNoteId;

          return (
            <li
              key={note.id}
              onClick={() => onSelect(note)}
              style={{
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: isSelected ? "#eef" : "#fff",
                border: "1px solid #ccc",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              {/* Note summary */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "6px",
                  }}
                >
                  {note.title}
                </div>

                {/* Category badge */}
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    fontSize: "12px",
                    borderRadius: "12px",
                    backgroundColor:
                      note.categoryId == null ? "#ddd" : "#cce5ff",
                    color: "#333",
                  }}
                >
                  {categoryName}
                </span>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive(note);
                  }}
                  title="Archive"
                >
                  📦
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note);
                  }}
                  title="Delete"
                >
                  ❌
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NotesList;