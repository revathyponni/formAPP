import { Component, computed, inject } from '@angular/core';
import { CanComponentDeactivate } from '../../guards/navigation.guard';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements CanComponentDeactivate {
  // Injections
  private authService = inject(AuthService);


  isAdmin = computed(() => this.authService.isAdmin());

  canDeactivate(): boolean {
    if (this.authService.isLoggingOut()) {
      return true;
    }
    return confirm('Are you sure you want to leave? Any unsaved changes may be lost.');
  }
}
