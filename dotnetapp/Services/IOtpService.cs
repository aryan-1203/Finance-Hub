using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public interface IOtpService
    {
        
        
        void SendOtp(string mobileNumber);
        bool VerifyOtp(string mobileNumber, string otp);


    }
}