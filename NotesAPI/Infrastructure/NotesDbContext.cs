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
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>()
                .HasOne(n => n.Category)
                .WithMany()
                .HasForeignKey(n => n.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Category>()
                .Property(c => c.Name)
                .IsRequired();
        }
    }
}
