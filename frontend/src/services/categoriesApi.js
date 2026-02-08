const API_BASE_URL = "https://localhost:7043/api/Categories";

export async function getCategories() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Error al obtener categorías");
  }

  return await response.json();
}