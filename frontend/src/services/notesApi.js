const API_BASE_URL = "https://localhost:7043/api/Notes";

/* =======================
   NOTAS ACTIVAS
======================= */

export async function getActiveNotes() {
  const response = await fetch(`${API_BASE_URL}/active`);

  if (!response.ok) {
    throw new Error("Error al obtener notas activas");
  }

  return await response.json();
}

/* =======================
   CREAR NOTA
======================= */

export async function createNote(title, content) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    throw new Error("Error al crear la nota");
  }
}

/* =======================
   ACTUALIZACIONES
======================= */

export async function updateNoteTitle(id, title) {
  const response = await fetch(`${API_BASE_URL}/${id}/title`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el título");
  }
}

export async function updateNoteContent(id, content) {
  const response = await fetch(`${API_BASE_URL}/${id}/content`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el contenido");
  }
}

/* =======================
   ACTUALIZAR CATEGORÍA
======================= */

export async function updateNoteCategory(id, categoryId) {
  const response = await fetch(`${API_BASE_URL}/${id}/category`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryId }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la categoría");
  }
}

/* =======================
   ELIMINAR
======================= */

export async function deleteNote(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la nota");
  }
}

/* =======================
   ARCHIVAR / DESARCHIVAR
======================= */

export async function archiveNote(id) {
  const response = await fetch(
    `${API_BASE_URL}/${id}/archive`,
    { method: "POST" }
  );

  if (!response.ok) {
    throw new Error("No se pudo archivar la nota");
  }
}

export async function unarchiveNote(id) {
  const response = await fetch(
    `${API_BASE_URL}/${id}/unarchive`,
    { method: "POST" }
  );

  if (!response.ok) {
    throw new Error("No se pudo desarchivar la nota");
  }
}

/* =======================
   NOTAS ARCHIVADAS
======================= */

export async function getArchivedNotes() {
  const response = await fetch(`${API_BASE_URL}/archived`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar las notas archivadas");
  }

  return await response.json();
}
