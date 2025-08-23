import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormField } from '../../../models/field';
import { AuthService } from '../../../services/auth.service';

/**
 * This component is used to edit a form.
 */
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

  isAdmin = computed(() => this.authService.isAdmin());

  /**
   * This method is called when a form field is dropped.
   * @param event The drag drop event
   * @param rowId The ID of the row where the field is dropped
   */
  onDrop(event: CdkDragDrop<string>, rowId: string): void {
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
