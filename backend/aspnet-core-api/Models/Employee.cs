// Models/Employee.cs
using System.ComponentModel.DataAnnotations;

namespace aspnet_core_api.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Phone]
        [StringLength(15)]
        public string? Phone { get; set; }

        [Required]
        [Range(0, 999999.99)]
        public decimal Salary { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        // Add this navigation property
        public Department? Department { get; set; }
    }
}