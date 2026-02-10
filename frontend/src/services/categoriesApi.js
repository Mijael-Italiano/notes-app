const API_BASE_URL = "https://localhost:7043/api/Categories";

/* =======================
   OBTENER CATEGORÍAS
======================= */
export async function getCategories() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Error al obtener categorías");
  }

  return await response.json();
}

/* =======================
   CREAR CATEGORÍA
======================= */
export async function createCategory(data) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear la categoría");
  }
}

/* =======================
   RENOMBRAR CATEGORÍA
======================= */
export async function renameCategory(id, data) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al renombrar la categoría");
  }
}

/* =======================
   ELIMINAR CATEGORÍA
======================= */
export async function deleteCategory(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la categoría");
  }
}