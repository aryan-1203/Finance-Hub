using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IEmailService _emailService; // ✅ Inject EmailService
        private readonly IOtpService _otpService;

        public AuthenticationController(IAuthService authService, IEmailService emailService, IOtpService otpService)
        {
            _authService = authService;
            _emailService = emailService;
            _otpService = otpService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid login request." });
            }

            var (statusCode, responseMessage) = await _authService.Login(model);

            if (statusCode == 1)
            {
                return Ok(new { token = responseMessage });
            }

            return Unauthorized(new { message = responseMessage });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid registration request." });
            }

            var (statusCode, responseMessage) = await _authService.Registration(request.User, request.User.UserRole, request.Otp);

            if (statusCode == 1)
            {
                // ✅ Send welcome email
                var subject = "Welcome to Finance Hub!";
                var body = $@"
                    <h2>Welcome to Finance Hub</h2>
                    <p>Hi {request.User.Username},</p>
                    <p>You have been successfully registered as a <strong>{request.User.UserRole}</strong>.</p>
                    <p>We're excited to have you on board!</p>
                    <br/>
                    <p>Best regards,<br/>Finance Hub Team</p>";

                await _emailService.SendEmailAsync(request.User.Email, subject, body);

                return Ok(new { message = responseMessage });
            }

            return BadRequest(responseMessage);
        }

        [HttpPost("send-otp")]
        public IActionResult SendOtp([FromBody] OtpRequest request)
        {
            if (string.IsNullOrEmpty(request.MobileNumber))
            {
                return BadRequest(new { message = "Mobile number is required." });
            }

            _otpService.SendOtp(request.MobileNumber);
            return Ok(new { message = "OTP sent successfully." });
        }
    }

    public class RegistrationRequest
    {
        public User User { get; set; }
        public string Otp { get; set; }
    }

    public class OtpRequest
    {
        public string MobileNumber { get; set; }
    }
}