import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from './environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  [x: string]: any;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, { usernameOrEmail, password });
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}

