import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { OptionItem } from '../../models/field';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-field-settings',
  standalone: false,
  templateUrl: './field-settings.component.html',
  styleUrl: './field-settings.component.scss',
})
export class FieldSettingsComponent {
  //Injections
  formService = inject(FormService);
  authService = inject(AuthService);

  // Computed property to check if user is admin
  isAdmin = computed(() => this.authService.isAdmin());

  fieldSettings = computed(() => {
    const selectedField = this.formService.selectedFieldId();
    if (!selectedField) return [];

    const fieldDef = this.formService.getFieldType(selectedField.type);

    return fieldDef?.settingsConfig || [];
  });

  fieldValues = computed(() => {
    const selectedField = this.formService.selectedFieldId();
    if (!selectedField) return {};

    return selectedField as any;
  });

  updateFieldValue(fieldId: string, settingKey: string, value: any) {
    this.formService.updateField(fieldId, { [settingKey]: value });
  }

  addOption(fieldId: string, settingKey: string) {
    const currentOptions = this.fieldValues()[settingKey] || [];
    const newOption = { label: 'New Option', value: `option${currentOptions.length + 1}` };
    const updatedOptions = [...currentOptions, newOption];
    this.formService.updateField(fieldId, { [settingKey]: updatedOptions });
  }

  removeOption(fieldId: string, settingKey: string, index: number) {
    const currentOptions: OptionItem[] = this.fieldValues()[settingKey] || [];
    const updatedOptions = currentOptions.filter((_: OptionItem, i: number) => i !== index);
    this.formService.updateField(fieldId, { [settingKey]: updatedOptions });
  }

  updateOptionLabel(fieldId: string, settingKey: string, index: number, label: string) {
    const currentOptions = this.fieldValues()[settingKey] || [];
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = { ...updatedOptions[index], label };
    this.formService.updateField(fieldId, { [settingKey]: updatedOptions });
  }

  updateOptionValue(fieldId: string, settingKey: string, index: number, value: string) {
    const currentOptions = this.fieldValues()[settingKey] || [];
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = { ...updatedOptions[index], value };
    this.formService.updateField(fieldId, { [settingKey]: updatedOptions });
  }
}
