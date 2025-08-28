import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser: User = {
    Email: "",
    Password: "",
    Username: "",
    MobileNumber: "",
    UserRole: ""
  };

  otp: string = "";
  otpSent: boolean = false;
  otpVerified: boolean = false;

  err: string = "";
  showPassword: boolean = false;
  confirmPassword: string = "";
  checkUserExists: boolean = false;
  pdfTermsAccepted: boolean = false;
  regionalManagerCode = environment.regionalManagerCode;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onMobileInputChange() {
    const raw = this.newUser.MobileNumber.replace(/\D/g, '');
    if (raw.length === 10) {
      this.newUser.MobileNumber = `+91 ${raw}`;
    }
  }

  sendOtp() {
    const pattern = /^\+91\s[6-9][0-9]{9}$/;
    if (!pattern.test(this.newUser.MobileNumber)) {
      Swal.fire('Invalid Mobile Number', 'Please enter a valid mobile number in format: +91 7611199572', 'error');
      return;
    }

    this.authService.sendOtp(this.newUser.MobileNumber).subscribe({
      next: () => {
        this.otpSent = true;
        Swal.fire('OTP Sent', 'Please check your mobile for the OTP.', 'success');
      },
      error: () => {
        Swal.fire('Error', 'Failed to send OTP. Try again.', 'error');
      }
    });
  }

  verifyOtp() {
    if (!this.otp || this.otp.length !== 6) {
      Swal.fire('Invalid OTP', 'Please enter a valid 6-digit OTP.', 'error');
      return;
    }

    const payload = {
      User: this.newUser,
      Otp: this.otp
    };

    this.authService.registerWithOtp(payload).subscribe({
      next: () => {
        this.otpVerified = true;
        Swal.fire('OTP Verified', 'You can now complete registration.', 'success');
      },
      error: () => {
        Swal.fire('Verification Failed', 'Incorrect OTP. Please try again.', 'error');
      }
    });
  }

  register() {
    if (!this.pdfTermsAccepted) {
      Swal.fire('Terms Required', 'Please accept the terms and conditions to proceed', 'warning');
      return;
    }

    if (!this.otpVerified) {
      Swal.fire('OTP Required', 'Please verify OTP before registering.', 'warning');
      return;
    }

    if (this.newUser.UserRole === 'RegionalManager') {
      Swal.fire({
        title: 'Enter the code',
        input: 'password',
        inputLabel: 'Please enter the code for Regional Manager',
        inputValidator: (value) => {
          if (!value) return 'You need to enter a code!';
          if (value !== this.regionalManagerCode) return 'Invalid code!';
          return null;
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
      }).then((result) => {
        if (result.isConfirmed) {
          this.completeRegistration();
        }
      });
    } else {
      this.completeRegistration();
    }
  }

  completeRegistration() {
    Swal.fire('Success!', 'Registration Successful!', 'success').then(() => {
      this.router.navigate(['/login']);
    });
  }
}
