import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { AuthService } from '../../../services/auth.service';

/**
 * This component is used to preview a form.
 */
@Component({
  selector: 'app-form-preview',
  standalone: false,
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss'
})
export class FormPreviewComponent {
  //Injections
  formService = inject(FormService);
  authService = inject(AuthService);

  hasFields = computed(() => {
    return this.formService.rows().some(row => row.fields.length > 0);
  });
}
