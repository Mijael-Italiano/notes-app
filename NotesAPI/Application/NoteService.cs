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

        public NoteService(NoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task CreateAsync(string title, string content)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new InvalidOperationException("El título de la nota es obligatorio.");

            var note = new Note(title, content);
            await _noteRepository.AddAsync(note);
        }

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
        {
            return await _noteRepository.GetActiveAsync();
        }

        public async Task<List<Note>> GetArchivedAsync()
        {
            return await _noteRepository.GetArchivedAsync();
        }

        public async Task DeleteAsync(int noteId)
        {
            var note = await _noteRepository.GetByIdAsync(noteId)
                ?? throw new InvalidOperationException("La nota no existe.");

            await _noteRepository.DeleteAsync(note);
        }

    }


}
