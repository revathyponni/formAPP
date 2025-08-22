import { Component, input, output, inject } from '@angular/core';
import { FormField } from '../../../models/field';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-button-field',
  standalone: false,
  templateUrl: './button-field.component.html',
  styleUrl: './button-field.component.scss'
})
export class ButtonFieldComponent {
  field = input.required<FormField>();
  onSubmit = output<void>();

  private formService = inject(FormService);

  handleClick() {
    if (this.field().buttonType === 'submit') {
      this.onSubmit.emit();
    }
  }

  isSubmitButton(): boolean {
    return this.field().buttonType === 'submit';
  }
}
