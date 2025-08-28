import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResetPasswordRequest } from 'src/app/models/reset.model';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.css']
})
export class ResetFormComponent implements OnInit {
  resetComp:ResetPasswordRequest={
    Email:'',
    Token:'',
    NewPassword:''
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    const token = this.route.snapshot.queryParamMap.get('token');

    this.resetComp.Email=email;
    this.resetComp.Token=token;
  }

  onSubmit(): void {
      this.http.post('https://8080-affbaaaeabecaceaecabcbceeddeeaecdae.project.examly.io/api/ForgotPassword/reset-password', this.resetComp)
        .subscribe({
          next: () => alert('Password reset successful!'),
          error: err => alert('Error resetting password: ' + err.message)
        });
    }
  }

