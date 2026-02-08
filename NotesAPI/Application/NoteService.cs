using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Notes.Domain;
using Notes.Infrastructure;

namespace Notes.Application
{
    public class NoteService
    {
        private readonly NoteRepository _noteRepository;
        private readonly CategoryService _categoryService;

        public NoteService(
            NoteRepository noteRepository,
            CategoryService categoryService)
        {
            _noteRepository = noteRepository;
            _categoryService = categoryService;
        }

        // =========================
        // CREATE
        // =========================
        public async Task CreateAsync(string title, string? content, int? categoryId)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new InvalidOperationException("El título de la nota es obligatorio.");

            if (await _noteRepository.TitleExistsAsync(title))
                throw new InvalidOperationException("Ya existe una nota con ese título.");

            var note = new Note(title, content);

            if (categoryId.HasValue)
            {
                var category = await _categoryService.GetByIdAsync(categoryId.Value);
                note.AssignCategory(category);
            }

            await _noteRepository.AddAsync(note);
        }

        // =========================
        // UPDATE CATEGORY
        // =========================
        public async Task UpdateCategoryAsync(int noteId, int? categoryId)
        {
            var note = await _noteRepository.GetByIdAsync(noteId)
                ?? throw new InvalidOperationException("La nota no existe.");

            if (categoryId == null)
            {
                note.RemoveCategory();
            }
            else
            {
                var category = await _categoryService.GetByIdAsync(categoryId.Value);
                note.AssignCategory(category);
            }

            await _noteRepository.UpdateAsync(note);
        }

        // =========================
        // RESTO (sin cambios)
        // =========================
        public async Task UpdateContentAsync(int noteId, string? newContent)
        {
            var note = await _noteRepository.GetByIdAsync(noteId)
                ?? throw new InvalidOperationException("La nota no existe.");

            note.UpdateContent(newContent);
            await _noteRepository.UpdateAsync(note);
        }

        public async Task UpdateTitleAsync(int noteId, string newTitle)
        {
            if (string.IsNullOrWhiteSpace(newTitle))
                throw new InvalidOperationException("El título de la nota es obligatorio.");

            var note = await _noteRepository.GetByIdAsync(noteId)
                ?? throw new InvalidOperationException("La nota no existe.");

            if (await _noteRepository.TitleExistsAsync(newTitle, noteId))
                throw new InvalidOperationException("Ya existe una nota con ese título.");

            note.UpdateTitle(newTitle);
            await _noteRepository.UpdateAsync(note);
        }

        public async Task ArchiveAsync(int noteId)
        {
            var note = await _noteRepository.GetByIdAsync(noteId)
                ?? throw new InvalidOperationException("La nota no existe.");

            if (note.IsArchived)
                throw new InvalidOperationException("La nota ya está archivada.");

            note.Archive();
            await _noteRepository.UpdateAsync(note);
        }

        public async Task UnarchiveAsync(int noteId)
        {
            var note = await _noteRepository.GetByIdAsync(noteId)
                ?? throw new InvalidOperationException("La nota no existe.");

            if (!note.IsArchived)
                throw new InvalidOperationException("La nota no está archivada.");

            note.Unarchive();
            await _noteRepository.UpdateAsync(note);
        }

        public async Task<List<Note>> GetActiveAsync()
            => await _noteRepository.GetActiveAsync();

        public async Task<List<Note>> GetArchivedAsync()
            => await _noteRepository.GetArchivedAsync();

        public async Task DeleteAsync(int noteId)
        {
            var note = await _noteRepository.GetByIdAsync(noteId)
                ?? throw new InvalidOperationException("La nota no existe.");

            await _noteRepository.DeleteAsync(note);
        }
    }
}