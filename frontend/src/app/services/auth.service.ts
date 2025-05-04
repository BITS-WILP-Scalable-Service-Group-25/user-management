import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { PlatformService } from './platform.service';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth0: Auth0Service,
    private platformService: PlatformService
  ) {
    console.log('Auth0 Configuration:', environment.auth0);
  }

  async login(): Promise<void> {
    console.log('Login method called');
    try {
      await firstValueFrom(this.auth0.loginWithRedirect());
    } catch (error: unknown) {
      console.error('Login error:', error);
    }
  }

  async logout(): Promise<void> {
    console.log('Logout method called');
    try {
      await firstValueFrom(this.auth0.logout({
        logoutParams: {
          returnTo: environment.auth0.authorizationParams.redirect_uri
        }
      }));
    } catch (error: unknown) {
      console.error('Logout error:', error);
    }
  }

  getUser() {
    return this.auth0.user$;
  }

  isAuthenticated() {
    return this.auth0.isAuthenticated$;
  }

  getToken() {
    return this.auth0.getAccessTokenSilently();
  }
}
