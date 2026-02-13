/*
  Base URL for Categories API.
  Uses Vite environment variable for environment-based configuration.
*/
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/Categories`;

/*
  Retrieves all available categories.
*/
export async function getCategories() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return await response.json();
}

/*
  Creates a new category.
  Expects an object with the category name.
*/
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

/*
  Renames an existing category by id.
*/
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

/*
  Deletes a category by id.
  Notes associated with it remain without category.
*/
export async function deleteCategory(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
}