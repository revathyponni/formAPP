import { Component, input } from '@angular/core';
import { FormField } from '../../../models/field';

/**
 * This component is used to render a select field in a form.
 */
@Component({
  selector: 'app-select-field',
  standalone: false,
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
})
export class SelectFieldComponent {
  field = input.required<FormField>();
}
