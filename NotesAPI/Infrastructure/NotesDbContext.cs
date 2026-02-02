using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Notes.Domain;


namespace Notes.Infrastructure
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options) { }
        public DbSet<Note> Notes { get; set; }
    }
}
