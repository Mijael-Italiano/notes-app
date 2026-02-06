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

        protected Category() { }

        public Category(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new InvalidOperationException("El nombre de la categoría es obligatorio.");

            Name = name;
        }

        public void Rename(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new InvalidOperationException("El nombre de la categoría es obligatorio.");

            Name = name;
        }
    }
}
