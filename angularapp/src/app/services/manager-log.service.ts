import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerLogService {
  public apiUrl=environment.apiUrl;
  constructor(private http:HttpClient){}
  getAllLogs():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/UserLog`);
  }
}
