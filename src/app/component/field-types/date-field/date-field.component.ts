import { Component, Input } from '@angular/core';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-date-field',
  standalone: false,
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss'
})
export class DateFieldComponent {
  @Input() field!: FormField;
}
