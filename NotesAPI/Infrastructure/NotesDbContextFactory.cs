using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Infrastructure
{
    public class NotesDbContextFactory
        : IDesignTimeDbContextFactory<NotesDbContext>
    {
        public NotesDbContext CreateDbContext(string[] args)
        {
            // Lee appsettings.json
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false)
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<NotesDbContext>();

            optionsBuilder.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection")
            );

            return new NotesDbContext(optionsBuilder.Options);
        }
    }
}
