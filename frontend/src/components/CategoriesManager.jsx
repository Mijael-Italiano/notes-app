import { useState } from "react";
import {
  createCategory,
  deleteCategory,
  renameCategory,
} from "../services/categoriesApi";

function CategoriesManager({ categories, onCategoriesChanged }) {
  const [newName, setNewName] = useState("");

  async function handleCreate() {
    if (!newName.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      await createCategory({ name: newName });
      setNewName("");
      await onCategoriesChanged();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleRename(category) {
    const name = prompt(
      "Nuevo nombre de la categoría",
      category.name
    );

    if (!name || name === category.name) return;

    try {
      await renameCategory(category.id, { name });
      await onCategoriesChanged();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete(category) {
    if (
      !window.confirm(
        `¿Eliminar la categoría "${category.name}"?\nLas notas quedarán sin categoría.`
      )
    )
      return;

    try {
      await deleteCategory(category.id);
      await onCategoriesChanged();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div
      style={{
        padding: "10px",
        borderBottom: "1px solid #ddd",
        marginBottom: "10px",
      }}
    >
      <h4 style={{ marginBottom: "8px" }}>
        Administrar categorías
      </h4>

      {/* CREAR */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={handleCreate}>➕</button>
      </div>

      {/* LISTA */}
      {categories.length === 0 && (
        <p style={{ fontSize: "12px", color: "#666" }}>
          No hay categorías
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((cat) => (
          <li
            key={cat.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <span>{cat.name}</span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button onClick={() => handleRename(cat)}>
                ✏️
              </button>
              <button onClick={() => handleDelete(cat)}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesManager;