import { Component, input } from '@angular/core';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-text-field',
  standalone: false,
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent {
field = input.required<FormField>();
}
