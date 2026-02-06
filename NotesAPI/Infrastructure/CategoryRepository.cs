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
    public class CategoryRepository
    {
        private readonly NotesDbContext _context;

        public CategoryRepository(NotesDbContext context)
        {
            _context = context;
        }

        // Listar todas las categorías
        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        // Buscar categoría por Id
        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        // Chequeo de unicidad para CREAR
        public async Task<bool> ExistsByNameAsync(string name)
        {
            return await _context.Categories
                .AnyAsync(c => c.Name == name);
        }

        // Chequeo de unicidad para MODIFICAR (excluye la propia categoría)
        public async Task<bool> ExistsByNameAsync(string name, int excludeCategoryId)
        {
            return await _context.Categories
                .AnyAsync(c =>
                    c.Name == name &&
                    c.Id != excludeCategoryId
                );
        }

        // Crear categoría
        public async Task AddAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        // Modificar categoría
        public async Task UpdateAsync(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }

        // Borrar categoría
        public async Task DeleteAsync(Category category)
        {
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}
