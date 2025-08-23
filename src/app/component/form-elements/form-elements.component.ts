import { Component, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-elements',
  standalone: false,
  templateUrl: './form-elements.component.html',
  styleUrl: './form-elements.component.scss',
})
export class FormElementsComponent {
  //Injections
  private formService = inject(FormService);

  fieldTypes = this.formService.getAllFields();

  /**
   * This method is used to block dropping on a specific element.
   * @param item The item being dragged
   * @returns boolean
   */
  blockDropOnElement(item: CdkDrag<any>): boolean {
    return false;
  }
}
