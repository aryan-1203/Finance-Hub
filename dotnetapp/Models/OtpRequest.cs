using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace dotnetapp.Models
{
    public class OtpRequest
    {
        
        [Required]
        [Phone]
        public string MobileNumber { get; set; }

    }
}