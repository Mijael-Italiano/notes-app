using System;
using Notes.Api.Dtos.Category;

namespace Notes.Api.Dtos.Note
{
    public class NoteResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Content { get; set; }
        public bool IsArchived { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public CategoryResponse? Category { get; set; }
    }
}
