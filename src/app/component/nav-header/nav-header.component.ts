import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  standalone: false
})
export class NavHeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.router.navigate(['/login']).then((res) => {
      if (res) {
        this.authService.logout();
      }
    });
  }
}
