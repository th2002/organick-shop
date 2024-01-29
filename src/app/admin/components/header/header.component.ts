import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '@shared/services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private auth: AuthService) {}

  handleLogOut() {
    this.auth.logout();
  }
}
