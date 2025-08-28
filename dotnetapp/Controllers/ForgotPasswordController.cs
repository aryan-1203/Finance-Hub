using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.IdentityModel.Tokens;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using dotnetapp.Services;
using Internal;
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailService _emailService;
        public ForgotPasswordController(UserManager<ApplicationUser> userManager,IEmailService emailService){
            _userManager=userManager;
            _emailService=emailService;
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            Console.WriteLine(request.Email);
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                // Always return a generic message to avoid revealing whether the email exists
                return Ok(new{message="Check your registered email for reset link."});
            }
            await _userManager.UpdateSecurityStampAsync(user);
            //var token1 = await _userManager.GeneratePasswordResetTokenAsync(user);
            //await Task.Delay(1000); // simulate delay
            //var token2 = await _userManager.GeneratePasswordResetTokenAsync(user);

            //Console.WriteLine(token1 == token2 ? "Same token" : "Different tokens");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            Console.WriteLine("Generated Token : " + token);

            // Replace with your actual Angular frontend URL
            var frontendBaseUrl = "https://8081-affbaaaeabecaceaecabcbceeddeeaecdae.project.examly.io";
            var resetLink = $"{frontendBaseUrl}/reset-form?email={user.Email}&token={Uri.EscapeDataString(token)}";

            // Load and format the email template if you have one, or use inline HTML
            var emailBody = $"Click here to reset your password: <a href='{resetLink}'>Reset Password</a>";

            await _emailService.SendEmailAsync(user.Email, "Password Reset", emailBody);

            return Ok(new{message="Check your registered email for reset link."});
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null){
                return BadRequest(new{message="User not found"});
            }
            var result = await _userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);
            if(result.Succeeded){
                return Ok();
            }
            return BadRequest();
        }
    }
}