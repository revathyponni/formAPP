import { Component, Input } from '@angular/core';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-radio-field',
  standalone: false,
  templateUrl: './radio-field.component.html',
  styleUrl: './radio-field.component.scss'
})
export class RadioFieldComponent {
  @Input() field!: FormField;
}
