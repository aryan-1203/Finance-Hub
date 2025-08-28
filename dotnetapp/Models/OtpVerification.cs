using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace dotnetapp.Models
{
    public class OtpVerification
    {
        
        [Required]
        [Phone]
        public string MobileNumber { get; set; }

        [Required]
        [StringLength(6, MinimumLength = 4)]
        public string Otp { get; set; }

    }
}