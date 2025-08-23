import { Component, computed, inject, input } from '@angular/core';
import { FormField } from '../../../models/field';
import { FormService } from '../../../services/form.service';
import { AuthService } from '../../../services/auth.service';

/**
 * This component is used to represent a form field.
 */
@Component({
  selector: 'app-form-field',
  standalone: false,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  field = input.required<FormField>();

  // Injections
  formService = inject(FormService);
  private authService = inject(AuthService);

  // Computed properties
  isSelected = computed(() =>
    this.formService.selectedFieldId()?.id === this.field().id
  );
  isAdmin = computed(() => this.authService.isAdmin());

  /**
   * This method is called to remove a form field.
   * @param event The mouse event
   */
  removeField(event: MouseEvent): void {
    event.stopPropagation();
    this.formService.deleteField(this.field().id);
  }
}
