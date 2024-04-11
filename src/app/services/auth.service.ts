import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://apilivechat-14d30f540cfa.herokuapp.com/api'; 
  constructor(private http: HttpClient) { }


  postLogin(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data);
  }

  postRegister(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }
}
