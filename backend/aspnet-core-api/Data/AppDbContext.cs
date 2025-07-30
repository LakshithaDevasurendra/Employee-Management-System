// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using aspnet_core_api.Models;

namespace aspnet_core_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<Department> Departments => Set<Department>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Optional: Seed sample departments
            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentId = 1, Name = "IT", Location = "New York" },
                new Department { DepartmentId = 2, Name = "HR", Location = "Los Angeles" },
                new Department { DepartmentId = 3, Name = "Finance", Location = "Chicago" }
            );
        }
    }
}