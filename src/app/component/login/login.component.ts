import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:false,
})
export class LoginComponent {
  username = '';
  password = '';
  role: 'admin' | 'user' = 'admin';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    const isAuthenticated = this.authService.login(this.username, this.password, this.role);

    if (isAuthenticated) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid login credentials or role';
    }
  }

  onRoleChange(selectedRole: 'admin' | 'user'): void {
    this.role = selectedRole;
  }
}
