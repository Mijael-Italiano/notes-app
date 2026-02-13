using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Domain
{
    public class Category
    {
        public int Id { get; private set; }

        public string Name { get; private set; }

        // Required by EF Core.
        protected Category() { }

        public Category(string name)
        {
            Name = name;
        }

        public void Rename(string name)
        {
            Name = name;
        }


    }
}
