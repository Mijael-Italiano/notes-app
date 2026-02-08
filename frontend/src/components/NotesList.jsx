import { updateNoteCategory } from "../services/notesApi";

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
    <div style={{ borderRight: "1px solid #ddd", padding: "10px" }}>
      <h3>Notas</h3>

      {/* FILTRO POR CATEGORÍA */}
      <div style={{ marginBottom: "10px" }}>
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
            }}
          >
            {/* TÍTULO */}
            <div style={{ fontWeight: "bold" }}>{note.title}</div>

            {/* CATEGORÍA DE LA NOTA */}
            <div style={{ marginTop: "4px" }}>
              <select
                value={note.categoryId ?? ""}
                onClick={(e) => e.stopPropagation()}
                onChange={async (e) => {
                  const categoryId =
                    e.target.value === "" ? null : Number(e.target.value);

                  await updateNoteCategory(note.id, categoryId);
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

            {/* ACCIONES */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                marginTop: "6px",
              }}
            >
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