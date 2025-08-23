import { Component, computed, inject } from '@angular/core';
import { CanComponentDeactivate } from '../../guards/navigation.guard';
import { AuthService } from '../../services/auth.service';

/**
 * This component is used to display the dashboard.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements CanComponentDeactivate {
  isAdmin = computed(() => this.authService.isAdmin());

  // Injections
  private authService = inject(AuthService);

  /**
   * This method is used to determine if the component can be deactivated.
   * @returns boolean indicating if the component can be deactivated
   */
  canDeactivate(): boolean {
    if (this.authService.isLoggingOut()) {
      return true;
    }
    return confirm(
      'Are you sure you want to leave? Any unsaved changes may be lost.'
    );
  }
}
