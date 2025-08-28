using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.IdentityModel.Tokens;
using dotnetapp.Data;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        private readonly IUserLogService _userLogService;
        private readonly IOtpService _otpService;

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager, ApplicationDbContext context,IUserLogService userLogService, IOtpService otpService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _context = context;
            _userLogService=userLogService;
            _otpService = otpService;
        }

        public async Task<(int, string)> Registration(User model, string role, string otp)
        {
            // Verify OTP before proceeding
            bool isOtpValid = _otpService.VerifyOtp(model.MobileNumber, otp);
            if (!isOtpValid)
            {
                return (0, "Invalid OTP. Registration failed.");
            }

            // Check if user already exists
            var foundUser = await _userManager.FindByEmailAsync(model.Email);
            if (foundUser != null)
            {
                Console.WriteLine("Email already in use.");
                _userLogService.LogActionAsync(0,"Failed registration attempt");
                return (0, "Email already in use.");
            }

            // Create new ApplicationUser
            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Create role if it doesn't exist
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }

                // Assign role to user
                await _userManager.AddToRoleAsync(user, role);

                // Save custom user details
                var customUser = new User
                {
                    Username = model.Username,
                    Email = model.Email,
                    MobileNumber = model.MobileNumber,
                    Password = model.Password,
                    UserRole = model.UserRole
                };

                _context.Users.Add(customUser);
                await _context.SaveChangesAsync();
                await _userLogService.LogActionAsync(customUser.UserId,"Registration");
                return (1, "User created successfully!");
            }
            else if (result.Errors.Any(e => e.Code == "DuplicateUserName"))
            {
                _userLogService.LogActionAsync(0,"Failed registration attempt");
                return (0, "User already exists");
            }
            _userLogService.LogActionAsync(0,"Failed registration attempt");
            return (0, "User creation failed! Please check user details and try again.");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                Console.WriteLine("Invalid email");
                _userLogService.LogActionAsync(0,"Failed login attempt");
                return (0, "Invalid email");
            }

            var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var customUser = _context.Users.FirstOrDefault(u => u.Email == model.Email);
                var role = await _userManager.GetRolesAsync(user);
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, customUser.UserId.ToString()),
                    new Claim(ClaimTypes.Role, role.FirstOrDefault())
                };

                var token = GenerateToken(claims); //"uigvyicfuyfv.jbkijb.vyuv"
                await _userLogService.LogActionAsync(customUser.UserId,"Login");
                return (1, token);
            }
            _userLogService.LogActionAsync(0,"Failed login attempt");
            return (0, "Invalid password");
        }

        public string GenerateToken(IEnumerable<Claim> claims)
        {
            var jwtKey = _configuration["Jwt:Key"] ??
                throw new InvalidOperationException("JWT key is not configured");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(5),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
