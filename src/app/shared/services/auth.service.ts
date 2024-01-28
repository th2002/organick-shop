import { Injectable } from '@angular/core';
import { HttpMethodService } from '~/core/services/http-method.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
interface IUser {
  email: string;
  password: string;
  typeUser?: 0 | 1;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_signup: string = 'http://localhost:8000/auth/register';
  api_login: string = 'http://localhost:8000/auth/login';
  private jwtHelper = new JwtHelperService();
  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$ = this.userSubject.asObservable();
  constructor(
    private http: HttpMethodService,
    private router: Router
  ) {}

  signUp(email: string, password: string): Observable<IUser> {
    const user_data: IUser = {
      email: email,
      password: password,
      typeUser: 0
    };

    return this.http.post(this.api_signup, user_data);
  }

  login(email: string, password: string) {
    const user_data: IUser = {
      email: email,
      password: password
    };

    this.http.post(this.api_login, user_data).subscribe({
      next: (res: { access_token: string }) => {
        const token: string = res.access_token;
        localStorage.setItem('access_token', token);
        this.userSubject.next(this.get_user_info());
        const user_data: IUser | null = this.get_user_info();

        user_data?.typeUser === 0
          ? this.router.navigate(['home'])
          : this.router.navigate(['dashboard']);
      },
      error: e => console.error(e.message)
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userSubject.next(null);
    this.router.navigate(['login-signup']);
  }

  get_user_info(): IUser | null {
    let result: IUser | null = null;
    try {
      const token: string = localStorage.getItem('access_token') || '';
      const decodedToken: IUser | null = this.jwtHelper.decodeToken(token);
      this.userSubject.next(decodedToken);
      result = decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return result;
  }

  is_logged(): boolean {
    const token = localStorage.getItem('access_token');
    let result: boolean = false;
    try {
      result = !!token && !this.jwtHelper.isTokenExpired(token);
    } catch(err) {
      console.error('An error occurred while checking the token:', err);
    }
    return result;
  }
}
