const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/Categories`;

/* =======================
   GET CATEGORIES
======================= */
export async function getCategories() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return await response.json();
}

/* =======================
   CREATE CATEGORY
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
    throw new Error("Failed to create category");
  }
}

/* =======================
   RENAME CATEGORY
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
    throw new Error("Failed to rename category");
  }
}

/* =======================
   DELETE CATEGORY
======================= */
export async function deleteCategory(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
}