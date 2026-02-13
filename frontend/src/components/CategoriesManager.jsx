import { useState } from "react";
import {
  createCategory,
  deleteCategory,
  renameCategory,
} from "../services/categoriesApi";

/*
  Manages category CRUD operations.
  Delegates persistence to API layer and notifies parent on changes.
*/
function CategoriesManager({ categories, onCategoriesChanged }) {
  const [newName, setNewName] = useState("");

  /*
    Creates a new category after basic validation.
  */
  async function handleCreate() {
    if (!newName.trim()) {
      alert("Name is required");
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

  /*
    Renames selected category.
  */
  async function handleRename(category) {
    const name = prompt(
      "New category name",
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

  /*
    Deletes selected category after confirmation.
  */
  async function handleDelete(category) {
    if (
      !window.confirm(
        `Delete category "${category.name}"?\nNotes will be left without a category.`
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
        Manage categories
      </h4>

      {/* Category creation input */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "10px",
        }}
      >
        <input
          type="text"
          placeholder="New category"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={handleCreate}>➕</button>
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <p style={{ fontSize: "12px", color: "#666" }}>
          No categories
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

            {/* Rename / Delete actions */}
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