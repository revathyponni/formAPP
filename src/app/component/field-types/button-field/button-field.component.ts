import { Component, input, output, inject } from '@angular/core';
import { FormField } from '../../../models/field';
import { FormService } from '../../../services/form.service';

/**
 *  This component is used to render a button field in a form.
 */
@Component({
  selector: 'app-button-field',
  standalone: false,
  templateUrl: './button-field.component.html',
  styleUrl: './button-field.component.scss',
})
export class ButtonFieldComponent {
  field = input.required<FormField>();
  onSubmit = output<void>();

  private formService = inject(FormService);

  /**
   * Handles the click event for the button.
   */
  handleClick(): void {
    if (this.field().buttonType === 'submit') {
      this.onSubmit.emit();
    }
  }

  /**
   * Checks if the button is a submit button.
   * @returns True if the button is a submit button, false otherwise.
   */
  isSubmitButton(): boolean {
    return this.field().buttonType === 'submit';
  }
}
