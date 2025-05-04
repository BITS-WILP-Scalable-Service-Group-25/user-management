import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoginComponent {
  constructor(public auth: AuthService) {
    console.log('LoginComponent initialized');
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
