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
    // Repository responsible for Category persistence operations.
    public class CategoryRepository
    {
        private readonly NotesDbContext _context;

        public CategoryRepository(NotesDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        // Checks name uniqueness when creating a category.
        public async Task<bool> ExistsByNameAsync(string name)
        {
            return await _context.Categories
                .AnyAsync(c => c.Name == name);
        }

        // Checks name uniqueness when updating a category,
        // excluding the current category from validation.
        public async Task<bool> ExistsByNameAsync(string name, int excludeCategoryId)
        {
            return await _context.Categories
                .AnyAsync(c =>
                    c.Name == name &&
                    c.Id != excludeCategoryId
                );
        }

        public async Task AddAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Category category)
        {
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}