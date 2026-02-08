using Microsoft.AspNetCore.Mvc;
using Notes.Application;
using Notes.Api.Dtos.Note;
using Notes.Api.Dtos.Category;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Notes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NoteService _noteService;

        public NotesController(NoteService noteService)
        {
            _noteService = noteService;
        }

        // =========================
        // CREATE
        // =========================
        [HttpPost]
        public async Task<IActionResult> Create(CreateNoteRequest request)
        {
            await _noteService.CreateAsync(
                request.Title,
                request.Content,
                request.CategoryId
            );

            return Ok();
        }

        // =========================
        // GET ACTIVE
        // =========================
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<NoteResponse>>> GetActive()
        {
            var notes = await _noteService.GetActiveAsync();

            var response = notes.Select(n => new NoteResponse
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
                IsArchived = n.IsArchived,
                CreatedAt = n.CreatedAt,
                Category = n.Category == null
                    ? null
                    : new CategoryResponse
                    {
                        Id = n.Category.Id,
                        Name = n.Category.Name
                    }
            });

            return Ok(response);
        }

        // =========================
        // GET ARCHIVED
        // =========================
        [HttpGet("archived")]
        public async Task<ActionResult<IEnumerable<NoteResponse>>> GetArchived()
        {
            var notes = await _noteService.GetArchivedAsync();

            var response = notes.Select(n => new NoteResponse
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
                IsArchived = n.IsArchived,
                CreatedAt = n.CreatedAt,
                Category = n.Category == null
                    ? null
                    : new CategoryResponse
                    {
                        Id = n.Category.Id,
                        Name = n.Category.Name
                    }
            });

            return Ok(response);
        }

        // =========================
        // UPDATE
        // =========================
        [HttpPut("{id}/title")]
        public async Task<IActionResult> UpdateTitle(int id, UpdateTitleRequest request)
        {
            await _noteService.UpdateTitleAsync(id, request.Title);
            return Ok();
        }

        [HttpPut("{id}/content")]
        public async Task<IActionResult> UpdateContent(int id, UpdateContentRequest request)
        {
            await _noteService.UpdateContentAsync(id, request.Content);
            return Ok();
        }

        [HttpPut("{id}/category")]
        public async Task<IActionResult> UpdateCategory(int id, UpdateNoteCategoryRequest request)
        {
            await _noteService.UpdateCategoryAsync(id, request.CategoryId);
            return Ok();
        }

        // =========================
        // ARCHIVE
        // =========================
        [HttpPost("{id}/archive")]
        public async Task<IActionResult> Archive(int id)
        {
            await _noteService.ArchiveAsync(id);
            return Ok();
        }

        [HttpPost("{id}/unarchive")]
        public async Task<IActionResult> Unarchive(int id)
        {
            await _noteService.UnarchiveAsync(id);
            return Ok();
        }

        // =========================
        // DELETE
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _noteService.DeleteAsync(id);
            return Ok();
        }
    }
}