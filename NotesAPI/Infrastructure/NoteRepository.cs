using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Notes.Domain;

namespace Notes.Infrastructure
{
    // Repository responsible for Note persistence operations.
    public class NoteRepository
    {
        private readonly NotesDbContext _context;

        public NoteRepository(NotesDbContext context)
        {
            _context = context;
        }

        // Returns non-archived notes including their Category,
        // ordered by last modification date (descending).
        public async Task<List<Note>> GetActiveAsync()
        {
            return await _context.Notes
                .Include(n => n.Category)
                .Where(n => !n.IsArchived)
                .OrderByDescending(n => n.ModifiedAt)
                .ToListAsync();
        }

        // Returns archived notes including their Category,
        // ordered by last modification date (descending).
        public async Task<List<Note>> GetArchivedAsync()
        {
            return await _context.Notes
                .Include(n => n.Category)
                .Where(n => n.IsArchived)
                .OrderByDescending(n => n.ModifiedAt)
                .ToListAsync();
        }

        public async Task<Note?> GetByIdAsync(int id)
        {
            return await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);
        }

        public async Task AddAsync(Note note)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Note note)
        {
            _context.Notes.Update(note);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Note note)
        {
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
        }

        // Checks title uniqueness.
        // Optionally excludes a specific note (used during updates).
        public async Task<bool> TitleExistsAsync(string title, int? excludeNoteId = null)
        {
            return await _context.Notes
                .Where(n => n.Title == title)
                .Where(n => excludeNoteId == null || n.Id != excludeNoteId)
                .AnyAsync();
        }
    }
}