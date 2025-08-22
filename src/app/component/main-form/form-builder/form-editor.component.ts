import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormField } from '../../../models/field';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-form-editor',
  standalone: false,
  templateUrl: './form-editor.component.html',
  styleUrl: './form-editor.component.scss',
})
export class FormEditorComponent {
  //Injections
  formService = inject(FormService);
  authService = inject(AuthService);

  // Computed property to check if user is admin
  isAdmin = computed(() => this.authService.isAdmin());
  onDrop(event: CdkDragDrop<string>, rowId: string) {
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data;
      const newField: FormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
       ...fieldType.defaultConfig,
      };
      this.formService.addField(newField, rowId, event.currentIndex);
    }
    else {
      const fieldId = event.item.data.id;
      const fromRowId = event.previousContainer.data;
      this.formService.moveField(fieldId, fromRowId, rowId, event.currentIndex);
    }
  }
}
