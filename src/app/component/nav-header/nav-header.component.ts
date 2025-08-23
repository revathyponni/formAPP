import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * This component is used for the navigation header.
 */
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  standalone: false,
})
export class NavHeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  /**
   * This method is used to log out the user.
   */
  logout(): void {
    this.router.navigate(['/login']).then((res) => {
      if (res) {
        this.authService.logout();
      }
    });
  }
}
