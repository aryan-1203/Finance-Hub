import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addMessage(message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/GeminiChat`, { message });
  }
}
