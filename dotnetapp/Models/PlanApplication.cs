using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using dotnetapp.Models;

namespace dotnetapp.Models
{
    public class PlanApplication
    {
        [Key]
        public int PlanApplicationId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int SavingsPlanId { get; set; }
        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal AppliedAmount { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public DateTime ApplicationDate { get; set; }
        [MaxLength(500)]
        public string? Remarks { get; set; }

        public string? ProofDocument { get; set; }

        [ForeignKey("UserId")]
        // [JsonIgnore]
        public User? User { get; set; }

        [ForeignKey("SavingsPlanId")]
        // [JsonIgnore]
        public SavingsPlan? SavingsPlan { get; set; }
       
    }
}
