import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordRequest } from 'src/app/models/forgotPasswordRequest.model';
import { ForgotService } from 'src/app/services/forgot.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  emailAdd:ForgotPasswordRequest={
    Email:''
  }
  constructor(private ser:ForgotService,private router:Router){}
  sendRequest(){
    this.ser.sendRequest(this.emailAdd).subscribe(()=>this.router.navigate(['/checkInbox']));
  }
  ngOnInit(): void {
  }

}
