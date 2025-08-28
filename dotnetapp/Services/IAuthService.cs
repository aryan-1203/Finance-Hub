using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface IAuthService
    {
        Task<(int, string)> Registration(User model, string role, string otp);
        Task<(int, string)> Login(LoginModel model);
        string GenerateToken(IEnumerable<Claim> claims);
    }
}
