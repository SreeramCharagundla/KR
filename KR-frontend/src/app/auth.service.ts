import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  success: boolean;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(phoneNumber: string): Observable<LoginResponse> {
    // GET /api/users/login/{phoneNumber}
    return this.http.get<LoginResponse>(`/api/users/login/${phoneNumber}`);
  }
}
