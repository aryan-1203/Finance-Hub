using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace dotnetapp.Services
{
    public class OtpService : IOtpService
    {
        
        private readonly IConfiguration _configuration;
        private static readonly ConcurrentDictionary<string, string> otpStore = new();

        public OtpService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        
        public void SendOtp(string mobileNumber)
        {
            var otp = new Random().Next(100000, 999999).ToString();
            otpStore[mobileNumber] = otp;

            TwilioClient.Init(
                _configuration["Twilio:AccountSid"],
                _configuration["Twilio:AuthToken"]
            );
            
            var message = MessageResource.Create(
                body: $"Your OTP is: {otp}",
                from: new PhoneNumber(_configuration["Twilio:FromNumber"]),
                to: new PhoneNumber(mobileNumber)
            );

            Console.WriteLine($"OTP sent to {mobileNumber}: {otp} (SID: {message.Sid})");
        }
        public bool VerifyOtp(string mobileNumber, string otp)
        {
            return otpStore.TryGetValue(mobileNumber, out var storedOtp) && storedOtp == otp;
        }
    }
}
