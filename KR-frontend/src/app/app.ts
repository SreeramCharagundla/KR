import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  isLoggedIn = false;
  showLoginForm = false;
  userName = '';

  showLogin(): void {
    this.showLoginForm = true;
  }

  /** receives the user’s name from <app-login> */
  handleLogin(name: string): void {
    this.userName = name;
    this.isLoggedIn = true;
    this.showLoginForm = false;
  }
}
