using Notes.Domain;
using Notes.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Notes.Application
{
    // Application service responsible for Category use cases and business rules.
    public class CategoryService
    {
        private readonly CategoryRepository _categoryRepository;

        public CategoryService(CategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<Category> GetByIdAsync(int categoryId)
        {
            return await _categoryRepository.GetByIdAsync(categoryId)
                ?? throw new InvalidOperationException("La categoría no existe.");
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _categoryRepository.GetAllAsync();
        }

        // Creates a category enforcing name validation and uniqueness.
        public async Task CreateAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new InvalidOperationException("El nombre de la categoría es obligatorio.");

            if (await _categoryRepository.ExistsByNameAsync(name))
                throw new InvalidOperationException("Ya existe una categoría con ese nombre.");

            var category = new Category(name);
            await _categoryRepository.AddAsync(category);
        }

        // Renames a category enforcing validation and uniqueness.
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

        public async Task DeleteAsync(int categoryId)
        {
            var category = await _categoryRepository.GetByIdAsync(categoryId)
                ?? throw new InvalidOperationException("La categoría no existe.");

            await _categoryRepository.DeleteAsync(category);
        }
    }
}