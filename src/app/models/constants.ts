import { CheckBoxFieldComponent } from '../component/field-types/check-box-field/check-box-field.component';
import { SelectFieldComponent } from '../component/field-types/select-field/select-field.component';
import { TextFieldComponent } from '../component/field-types/text-field/text-field.component';
import { RadioFieldComponent } from '../component/field-types/radio-field/radio-field.component';
import { DateFieldComponent } from '../component/field-types/date-field/date-field.component';
import { ButtonFieldComponent } from '../component/field-types/button-field/button-field.component';
import { FieldTypeDefinition } from './field';

/**
 * Text field definition for form builder.
 */
export const TEXT_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  component: TextFieldComponent,
  settingsConfig: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'placeholder', label: 'Placeholder', type: 'text' },
    { key: 'required', label: 'Required', type: 'checkbox' },
    {
      key: 'inputType',
      label: 'Input Type',
      type: 'select',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Password', value: 'password' },
      ],
    },
  ],
};

/**
 * Radio field definition for form builder.
 */
export const RADIO_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'radio',
  label: 'Radio Button',
  icon: 'radio_button_checked',
  defaultConfig: {
    label: 'Radio Button',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
  component: RadioFieldComponent,
  settingsConfig: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'required', label: 'Required', type: 'checkbox' },
    {
      key: 'options',
      label: 'Radio Options',
      type: 'dynamic-options',
    },
  ],
};

/**
 * Date field definition for form builder.
 */
export const DATE_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'date',
  label: 'Date Picker',
  icon: 'calendar_today',
  defaultConfig: {
    label: 'Date Picker',
    required: false,
    placeholder: 'Select date',
  },
  component: DateFieldComponent,
  settingsConfig: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'placeholder', label: 'Placeholder', type: 'text' },
    { key: 'required', label: 'Required', type: 'checkbox' },
  ],
};

/**
 * Checkbox field definition for form builder.
 */
export const CHECKBOX_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
  component: CheckBoxFieldComponent,
  settingsConfig: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'required', label: 'Required', type: 'checkbox' },
    {
      key: 'options',
      label: 'Checkbox Options',
      type: 'dynamic-options',
    },
  ],
};

/**
 * Select field definition for form builder.
 */
export const SELECT_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'select',
  label: 'Select Field',
  icon: 'arrow_drop_down',
  defaultConfig: {
    label: 'Select Field',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  },
  component: SelectFieldComponent,
  settingsConfig: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'required', label: 'Required', type: 'checkbox' },
    {
      key: 'options',
      label: 'Dropdown Options',
      type: 'dynamic-options',
    },
  ],
};

/**
 * Button field definition for form builder.
 */
export const BUTTON_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'button',
  label: 'Button',
  icon: 'smart_button',
  defaultConfig: {
    label: 'Button',
    required: false,
    buttonType: 'btn-primary',
    alignment: 'left',
    showCancel: false,
    cancelLabel: 'Cancel',
    cancelButtonType: 'btn-secondary',
  },
  component: ButtonFieldComponent,
  settingsConfig: [
    { key: 'label', label: 'Button Text', type: 'text' },
    {
      key: 'buttonType',
      label: 'Button Type',
      type: 'select',
      options: [
        { label: 'Primary', value: 'btn-primary' },
        { label: 'Secondary', value: 'btn-secondary' },
        { label: 'Success', value: 'btn-success' },
        { label: 'Danger', value: 'btn-danger' },
        { label: 'Warning', value: 'btn-warning' },
        { label: 'Info', value: 'btn-info' },
        { label: 'Light', value: 'btn-light' },
        { label: 'Dark', value: 'btn-dark' },
        { label: 'Link', value: 'btn-link' },
      ],
    },
    {
      key: 'alignment',
      label: 'Alignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    { key: 'showCancel', label: 'Show Cancel Button', type: 'checkbox' },
    { key: 'cancelLabel', label: 'Cancel Button Text', type: 'text' },
    {
      key: 'cancelButtonType',
      label: 'Cancel Button Type',
      type: 'select',
      options: [
        { label: 'Primary', value: 'btn-primary' },
        { label: 'Secondary', value: 'btn-secondary' },
        { label: 'Success', value: 'btn-success' },
        { label: 'Danger', value: 'btn-danger' },
        { label: 'Warning', value: 'btn-warning' },
        { label: 'Info', value: 'btn-info' },
        { label: 'Light', value: 'btn-light' },
        { label: 'Dark', value: 'btn-dark' },
        { label: 'Link', value: 'btn-link' },
      ],
    },
  ],
};
