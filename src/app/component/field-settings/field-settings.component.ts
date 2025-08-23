import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { OptionItem } from '../../models/field';
import { AuthService } from '../../services/auth.service';

/**
 * This component is used to manage field settings.
 */
@Component({
  selector: 'app-field-settings',
  standalone: false,
  templateUrl: './field-settings.component.html',
  styleUrl: './field-settings.component.scss',
})
export class FieldSettingsComponent {
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

  //Injections
  formService = inject(FormService);
  authService = inject(AuthService);

  /**
   * Updates the value of a specific field.
   * @param fieldId - The ID of the field to update.
   * @param settingKey - The key of the setting to update.
   * @param value - The new value for the setting.
   */
  updateFieldValue(fieldId: string, settingKey: string, value: any): void {
    this.formService.updateField(fieldId, { [settingKey]: value });
  }

  /**
   * Adds a new option to a dynamic field.
   * @param fieldId - The ID of the field to update.
   * @param settingKey - The key of the setting to update.
   */
  addOption(fieldId: string, settingKey: string): void {
    const currentOptions = this.fieldValues()[settingKey] || [];
    const newOption = {
      label: 'New Option',
      value: `option${currentOptions.length + 1}`,
    };
    const updatedOptions = [...currentOptions, newOption];
    this.formService.updateField(fieldId, { [settingKey]: updatedOptions });
  }

  /**
   * Removes an option from a dynamic field.
   * @param fieldId - The ID of the field to update.
   * @param settingKey - The key of the setting to update.
   * @param index - The index of the option to remove.
   */
  removeOption(fieldId: string, settingKey: string, index: number): void {
    const currentOptions: OptionItem[] = this.fieldValues()[settingKey] || [];
    const updatedOptions = currentOptions.filter(
      (_: OptionItem, i: number) => i !== index
    );
    this.formService.updateField(fieldId, { [settingKey]: updatedOptions });
  }

  /**
   * Updates the label of an option in a dynamic field.
   * @param fieldId - The ID of the field to update.
   * @param settingKey - The key of the setting to update.
   * @param index - The index of the option to update.
   * @param label - The new label for the option.
   */
  updateOptionLabel(
    fieldId: string,
    settingKey: string,
    index: number,
    label: string
  ): void {
    const currentOptions = this.fieldValues()[settingKey] || [];
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = { ...updatedOptions[index], label };
    this.formService.updateField(fieldId, { [settingKey]: updatedOptions });
  }

  /**
   * Updates the value of an option in a dynamic field.
   * @param fieldId - The ID of the field to update.
   * @param settingKey - The key of the setting to update.
   * @param index - The index of the option to update.
   * @param value - The new value for the option.
   */
  updateOptionValue(
    fieldId: string,
    settingKey: string,
    index: number,
    value: string
  ): void {
    const currentOptions = this.fieldValues()[settingKey] || [];
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = { ...updatedOptions[index], value };
    this.formService.updateField(fieldId, { [settingKey]: updatedOptions });
  }
}
