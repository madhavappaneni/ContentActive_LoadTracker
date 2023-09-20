using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoadTracker.Models
{
    [Table("Loads")]
    public class Load
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        [StringLength(100)]
        public string LoadNumber { get; set; }

        [Required]
        [StringLength(100)]
        public string Product { get; set; }

        [Required]
        [StringLength(100)]
        public string Origin { get; set; }

        [Required]
        [StringLength(100)]
        public string Weight { get; set; }

        [Required]
        [StringLength(100)]
        public string Destination { get; set; }

        public int CustomerId { get; set; }

        public int DriverId { get; set; }

        public Customer Customer { get; set; }

        public Driver Driver{ get; set; }

        [Required]
        public DateTime CreatedDateTime { get; set; }

        [Required]
        public DateTime ModifiedDateTime { get; set; }
    }

}

    