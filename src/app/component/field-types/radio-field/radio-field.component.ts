import { Component, Input } from '@angular/core';
import { FormField } from '../../../models/field';

/**
 * This component is used to render a radio field in a form.
 */
@Component({
  selector: 'app-radio-field',
  standalone: false,
  templateUrl: './radio-field.component.html',
  styleUrl: './radio-field.component.scss',
})
export class RadioFieldComponent {
  @Input() field!: FormField;
}
