using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Domain
{
    public class Note
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int? CategoryId { get; private set; }

        public Category? Category { get; private set; }

        public string? Content { get; set; }

        public bool IsArchived { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? ModifiedAt { get; set; }

        protected Note()
        {
        }

        public Note(string title, string? content)
        {
            Title = title;
            Content = content;
            IsArchived = false;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateTitle(string title)
        {
            Title = title;
            ModifiedAt = DateTime.UtcNow;
        }

        public void UpdateContent(string? content)
        {
            Content = content;
            ModifiedAt = DateTime.UtcNow;
        }

        public void Archive()
        {
            IsArchived = true;
            ModifiedAt = DateTime.UtcNow;
        }

        public void Unarchive()
        {
            IsArchived = false;
            ModifiedAt = DateTime.UtcNow;
        }

        public void AssignCategory(Category category)
        {
            Category = category;
            CategoryId = category.Id;
            ModifiedAt = DateTime.UtcNow;
        }

        public void RemoveCategory()
        {
            Category = null;
            CategoryId = null;
            ModifiedAt = DateTime.UtcNow;
        }


    }

}
