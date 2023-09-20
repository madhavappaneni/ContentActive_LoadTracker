using System;
using System.ComponentModel.DataAnnotations;

namespace LoadTracker.DTOs
{
    public class AssignDriverToLoadDTO
    {
        public AssignDriverToLoadDTO()
        {
        }

        [Required]
        public int DriverId { get; set; }

        [Required]
        public int LoadId { get; set; }
    }
}

