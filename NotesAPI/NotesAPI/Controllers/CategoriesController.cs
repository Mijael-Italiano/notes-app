using Microsoft.AspNetCore.Mvc;
using Notes.Application;
using Notes.Api.Dtos.Category;
using Notes.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Notes.Api.Controllers
{
    // API controller responsible for Category endpoints.
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoriesController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetAll()
        {
            return Ok(await _categoryService.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCategoryRequest request)
        {
            await _categoryService.CreateAsync(request.Name);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Rename(int id, RenameCategoryRequest request)
        {
            await _categoryService.RenameAsync(id, request.Name);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryService.DeleteAsync(id);
            return Ok();
        }
    }
}