import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * This component is used for user login.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent {
  username = '';
  password = '';
  role: 'admin' | 'user' = 'admin';
  errorMessage = '';

  // Injections
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * This method is called when the form is submitted.
   */
  onSubmit(): void {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    const isAuthenticated = this.authService.login(
      this.username,
      this.password,
      this.role
    );

    if (isAuthenticated) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid login credentials or role';
    }
  }

  /**
   * This method is called when the user selects a role.
   * @param selectedRole The role selected by the user.
   */
  onRoleChange(selectedRole: 'admin' | 'user'): void {
    this.role = selectedRole;
  }
}
