// Models/Department.cs
using System.ComponentModel.DataAnnotations;

namespace aspnet_core_api.Models
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Location { get; set; } = string.Empty;

        // Add this navigation property
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}