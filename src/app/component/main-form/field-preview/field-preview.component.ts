import { Component, computed, inject, input } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-field-preview',
  standalone: false,
  templateUrl: './field-preview.component.html',
  styleUrl: './field-preview.component.scss'
})
export class FieldPreviewComponent {
  field = input.required<FormField>();
// Injection
  formService = inject(FormService);

  previewComponent = computed(() => {
    const fieldType = this.formService.getFieldType(this.field().type);
    return fieldType ? fieldType?.component : null;
  });
}
