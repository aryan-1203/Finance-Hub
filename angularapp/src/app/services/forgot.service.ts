import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForgotPasswordRequest } from '../models/forgotPasswordRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  sendRequest(emailAdd:ForgotPasswordRequest):Observable<void>{
    return this.http.post<void>(`${environment.apiUrl}/api/ForgotPassword/forgot-password`,emailAdd);
  }
  constructor(private http:HttpClient) { }
}
