import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  phoneNumber = '';

  /** bubbles the user's name up to the parent */
  @Output() loggedIn = new EventEmitter<string>();

  constructor(private auth: AuthService) {}

  login(): void {
    this.auth.authenticate(this.phoneNumber).subscribe({
      next: ({ success, name }) => {
        success
          ? this.loggedIn.emit(name) // success → tell parent
          : alert('Login failed. Try again.');
      },
      error: () => alert('Something went wrong, please retry.'),
    });
  }
}
