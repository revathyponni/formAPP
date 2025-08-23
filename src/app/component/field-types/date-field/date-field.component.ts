import { Component, Input } from '@angular/core';
import { FormField } from '../../../models/field';

/**
 * This component is used to render a date field in a form.
 */
@Component({
  selector: 'app-date-field',
  standalone: false,
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss',
})
export class DateFieldComponent {
  @Input() field!: FormField;
}
