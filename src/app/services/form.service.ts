import { computed, Injectable, signal } from '@angular/core';
import {
  TEXT_FIELD_DEFINITION,
  CHECKBOX_FIELD_DEFINITION,
  SELECT_FIELD_DEFINITION,
  RADIO_FIELD_DEFINITION,
  DATE_FIELD_DEFINITION,
  BUTTON_FIELD_DEFINITION,
} from '../models/constants';
import { FieldTypeDefinition, FormField, FormRow } from '../models/field';
import { FormStorageService, StoredForm, FormSubmission } from './form-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  fieldTypes = new Map<string, FieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['select', SELECT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['radio', RADIO_FIELD_DEFINITION],
    ['date', DATE_FIELD_DEFINITION],
    ['button', BUTTON_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): FieldTypeDefinition | undefined {
    return this.fieldTypes.get(type);
  }

  private _rows = signal<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  private _hasUnsavedChanges = signal<boolean>(false);

  public readonly rows = this._rows.asReadonly();
  public readonly selectedFieldId = computed(() =>
    this._rows()
      .flatMap((row) => row.fields)
      .find((field) => field.id === this._selectedFieldId())
  );
  public readonly hasUnsavedChanges = this._hasUnsavedChanges.asReadonly();

  constructor(private formStorage: FormStorageService) {
    this._rows.set([{ id: crypto.randomUUID(), fields: [] }]);
  }

  // Unsaved changes tracking methods
  markAsUnsaved(): void {
    this._hasUnsavedChanges.set(true);
  }

  markAsSaved(): void {
    this._hasUnsavedChanges.set(false);
  }

  resetForm(): void {
    this._rows.set([{ id: crypto.randomUUID(), fields: [] }]);
    this.markAsSaved();
  }

  printValues(a:any){
    console.log(a);
  }
  getAllFields(): FieldTypeDefinition[] {
    return Array.from(this.fieldTypes.values());
  }

  addField(field: FormField, rowId: string, index?: number) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const updatedFields = [...row.fields];
        if (index !== undefined) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }
        return { ...row, fields: updatedFields };
      }
      return row;
    });
    this._rows.set(newRows);
    this.markAsUnsaved();
  }
  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      const updatedFields = row.fields.filter((f) => f.id !== fieldId);
      return { ...row, fields: updatedFields };
    });
    this._rows.set(newRows);
    this.markAsUnsaved();
  }

  addRow() {
    const newRow: FormRow = { id: crypto.randomUUID(), fields: [] };
    this._rows.set([...this._rows(), newRow]);
    this.markAsUnsaved();
  }

  deleteRow(rowId: string) {
    const rows = this._rows();
    if (rows.length > 1) {
      const newRows = rows.filter((row) => row.id !== rowId);
      this._rows.set(newRows);
      this.markAsUnsaved();
    }
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1
  ) {
    const rows = this._rows();
    let fieldToMove: FormField | undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;

    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex((f) => f.id === fieldId);
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });

    if (!fieldToMove) {
      return;
    }

    const newRows = [...rows];
    const fieldsWithRemoveField = newRows[sourceRowIndex].fields.filter(
      (f) => f.id !== fieldId
    );
    newRows[sourceRowIndex].fields = fieldsWithRemoveField;

    const targetRowIndex = newRows.findIndex((row) => row.id === targetRowId);
    if (targetRowIndex >= 0) {
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetFields;
    }
    this._rows.set(newRows);
    this.markAsUnsaved();
  }

  setSelectedField(fieldId: string | null) {
    this._selectedFieldId.set(fieldId);
  }

  updateField(fieldId: string, data: Partial<FormField>) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      return {
        ...row,
        fields: row.fields.map((field) => {
          if (field.id === fieldId) {
            return { ...field, ...data };
          }
          return field;
        }),
      };
    });
    this._rows.set(newRows);
    this.markAsUnsaved();
  }

  saveCurrentForm(name?: string): StoredForm {
    const formData = {
      name: name || 'Untitled Form',
      rows: this._rows()
    };
    const savedForm = this.formStorage.saveForm(formData);
    this.markAsSaved();
    return savedForm;
  }

  loadForm(formId: string): boolean {
    const form = this.formStorage.getForm(formId);
    if (form) {
      this._rows.set(form.rows);
      return true;
    }
    return false;
  }

  submitForm(formData: Record<string, any>): FormSubmission {
    // For now, we'll use a placeholder form ID since forms aren't persisted yet
    const formId = 'current-form';
    return this.formStorage.saveSubmission(formId, formData);
  }

  getAllStoredForms(): StoredForm[] {
    return this.formStorage.getAllForms();
  }

  deleteStoredForm(formId: string): void {
    this.formStorage.deleteForm(formId);
  }

  getFormSubmissions(formId: string): FormSubmission[] {
    return this.formStorage.getFormSubmissions(formId);
  }
}
