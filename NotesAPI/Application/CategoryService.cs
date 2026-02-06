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

        // Listar todas las categorías
        public async Task<List<Category>> GetAllAsync()
        {
            return await _categoryRepository.GetAllAsync();
        }

        // Crear categoría
        public async Task CreateAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new InvalidOperationException("El nombre de la categoría es obligatorio.");

            if (await _categoryRepository.ExistsByNameAsync(name))
                throw new InvalidOperationException("Ya existe una categoría con ese nombre.");

            var category = new Category(name);

            await _categoryRepository.AddAsync(category);
        }

        // Renombrar categoría
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

        // Borrar categoría
        public async Task DeleteAsync(int categoryId)
        {
            var category = await _categoryRepository.GetByIdAsync(categoryId)
                ?? throw new InvalidOperationException("La categoría no existe.");

            await _categoryRepository.DeleteAsync(category);
        }
    }
}
