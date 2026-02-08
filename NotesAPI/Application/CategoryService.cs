using Notes.Domain;
using Notes.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Notes.Application
{
    public class CategoryService
    {
        private readonly CategoryRepository _categoryRepository;

        public CategoryService(CategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // =========================
        // GET BY ID  ✅ (NUEVO)
        // =========================
        public async Task<Category> GetByIdAsync(int categoryId)
        {
            return await _categoryRepository.GetByIdAsync(categoryId)
                ?? throw new InvalidOperationException("La categoría no existe.");
        }

        // =========================
        // GET ALL
        // =========================
        public async Task<List<Category>> GetAllAsync()
        {
            return await _categoryRepository.GetAllAsync();
        }

        // =========================
        // CREATE
        // =========================
        public async Task CreateAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new InvalidOperationException("El nombre de la categoría es obligatorio.");

            if (await _categoryRepository.ExistsByNameAsync(name))
                throw new InvalidOperationException("Ya existe una categoría con ese nombre.");

            var category = new Category(name);
            await _categoryRepository.AddAsync(category);
        }

        // =========================
        // RENAME
        // =========================
        public async Task RenameAsync(int categoryId, string newName)
        {
            if (string.IsNullOrWhiteSpace(newName))
                throw new InvalidOperationException("El nombre de la categoría es obligatorio.");

            var category = await _categoryRepository.GetByIdAsync(categoryId)
                ?? throw new InvalidOperationException("La categoría no existe.");

            if (await _categoryRepository.ExistsByNameAsync(newName, categoryId))
                throw new InvalidOperationException("Ya existe otra categoría con ese nombre.");

            category.Rename(newName);
            await _categoryRepository.UpdateAsync(category);
        }

        // =========================
        // DELETE
        // =========================
        public async Task DeleteAsync(int categoryId)
        {
            var category = await _categoryRepository.GetByIdAsync(categoryId)
                ?? throw new InvalidOperationException("La categoría no existe.");

            await _categoryRepository.DeleteAsync(category);
        }
    }
}