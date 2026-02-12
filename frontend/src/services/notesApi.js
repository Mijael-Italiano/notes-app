const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/Notes`;

/* =======================
   ACTIVE NOTES
======================= */

export async function getActiveNotes() {
  const response = await fetch(`${API_BASE_URL}/active`);

  if (!response.ok) {
    throw new Error("Failed to fetch active notes");
  }

  return await response.json();
}

/* =======================
   CREATE NOTE
======================= */

export async function createNote(title, content, categoryId) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      categoryId, // 👈 KEY
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }
}

/* =======================
   UPDATES
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
    throw new Error("Failed to update note title");
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
    throw new Error("Failed to update note content");
  }
}

/* =======================
   UPDATE CATEGORY
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
    throw new Error("Failed to update note category");
  }
}

/* =======================
   DELETE
======================= */

export async function deleteNote(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
}

/* =======================
   ARCHIVE / UNARCHIVE
======================= */

export async function archiveNote(id) {
  const response = await fetch(`${API_BASE_URL}/${id}/archive`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to archive note");
  }
}

export async function unarchiveNote(id) {
  const response = await fetch(`${API_BASE_URL}/${id}/unarchive`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to unarchive note");
  }
}

/* =======================
   ARCHIVED NOTES
======================= */

export async function getArchivedNotes() {
  const response = await fetch(`${API_BASE_URL}/archived`);

  if (!response.ok) {
    throw new Error("Failed to fetch archived notes");
  }

  return await response.json();
}