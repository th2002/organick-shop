import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  canActivate() {
    if (this.auth.is_logged()) {
      const user_data = this.auth.get_user_info();
      const role = user_data?.typeUser;

      if (role === 1) return true;
    }
    this.router.navigate(['login-signup']);
    return false;
  }
}
