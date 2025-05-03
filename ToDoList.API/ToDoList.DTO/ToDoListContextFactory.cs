using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoList.DTO.Models;

namespace ToDoList.DTO
{
    // This is required only on migration
    // dotnet ef migrations add InitialCreate --project ToDoList.DTO
    // dotnet ef database update --project ToDoList.DTO
    public class ToDoListContextFactory : IDesignTimeDbContextFactory<ToDoListContext>
    {
        public ToDoListContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ToDoListContext>();

            optionsBuilder.UseSqlServer("server=DESKTOP-FAGI575\\SQLEXPRESS;database=ToDoListNew;Trusted_Connection=True;TrustServerCertificate=True;");

            return new ToDoListContext(optionsBuilder.Options);
        }
    }
}
