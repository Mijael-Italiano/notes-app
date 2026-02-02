using Microsoft.AspNetCore.Mvc;
using Notes.Application;
using Notes.Domain;
using Notes.Api.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        [HttpPost]
        public async Task<IActionResult> Create(CreateNoteRequest request)
        {
            await _noteService.CreateAsync(request.Title, request.Content);
            return Ok();
        }

        [HttpGet("active")]
        public async Task<ActionResult<List<Note>>> GetActive()
        {
            return Ok(await _noteService.GetActiveAsync());
        }

        [HttpGet("archived")]
        public async Task<ActionResult<List<Note>>> GetArchived()
        {
            return Ok(await _noteService.GetArchivedAsync());
        }

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _noteService.DeleteAsync(id);
            return Ok();
        }
    }
}