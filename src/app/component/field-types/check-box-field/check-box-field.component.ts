import { Component, input } from '@angular/core';
import { FormField, OptionItem } from '../../../models/field';

/**
 * This component is used to render a checkbox field in a form.
 */
@Component({
  selector: 'app-check-box-field',
  standalone: false,
  templateUrl: './check-box-field.component.html',
  styleUrl: './check-box-field.component.scss',
})
export class CheckBoxFieldComponent {
  field = input.required<FormField>();

  /**
   * This method returns the options for the checkbox field.
   * @returns An array of option items for the checkbox field.
   */
  getOptions(): OptionItem[] {
    return this.field().options || [];
  }
}
