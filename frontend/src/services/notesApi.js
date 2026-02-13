/*
  Base URL for Notes API.
  Uses Vite environment variable to support different environments (dev, docker, production).
*/
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/Notes`;

/*
  Retrieves all active (non-archived) notes.
*/
export async function getActiveNotes() {
  const response = await fetch(`${API_BASE_URL}/active`);

  if (!response.ok) {
    throw new Error("Failed to fetch active notes");
  }

  return await response.json();
}

/*
  Creates a new note.
*/
export async function createNote(title, content, categoryId) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      categoryId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }
}

/*
  Updates note title using a dedicated partial endpoint.
*/
export async function updateNoteTitle(id, title) {
  const response = await fetch(`${API_BASE_URL}/${id}/title`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to update note title");
  }
}

/*
  Updates note content using a dedicated partial endpoint.
*/
export async function updateNoteContent(id, content) {
  const response = await fetch(`${API_BASE_URL}/${id}/content`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Failed to update note content");
  }
}

/*
  Updates note category association.
*/
export async function updateNoteCategory(id, categoryId) {
  const response = await fetch(`${API_BASE_URL}/${id}/category`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryId }),
  });

  if (!response.ok) {
    throw new Error("Failed to update note category");
  }
}

/*
  Permanently deletes a note.
*/
export async function deleteNote(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
}

/*
  Marks a note as archived.
*/
export async function archiveNote(id) {
  const response = await fetch(`${API_BASE_URL}/${id}/archive`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to archive note");
  }
}

/*
  Restores a previously archived note.
*/
export async function unarchiveNote(id) {
  const response = await fetch(`${API_BASE_URL}/${id}/unarchive`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to unarchive note");
  }
}

/*
  Retrieves all archived notes.
*/
export async function getArchivedNotes() {
  const response = await fetch(`${API_BASE_URL}/archived`);

  if (!response.ok) {
    throw new Error("Failed to fetch archived notes");
  }

  return await response.json();
}