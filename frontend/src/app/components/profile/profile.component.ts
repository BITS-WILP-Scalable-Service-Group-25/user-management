import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container" *ngIf="user$ | async as user">
      <div class="profile-header">
        <img [src]="user.picture" alt="Profile picture">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
      </div>
      <div class="profile-details">
        <pre>{{ user | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
    .profile-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .profile-header img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .profile-details {
      background-color: white;
      padding: 20px;
      border-radius: 4px;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user$!: Observable<any>;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user$ = this.auth.getUser();
  }
}
