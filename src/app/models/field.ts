/**
 * Field type definition for form builder.
 */
export interface FieldTypeDefinition {
  type: string;
  label: string;
  icon: string;
  defaultConfig: DefaultConfig;
  component: any;
  settingsConfig?: FieldSettingDefinition[];
}

/**
 * Default configuration for form fields.
 */
export interface DefaultConfig {
  label: string;
  required: boolean;
  placeholder?: string;
  options?: OptionItem[];
  buttonType?: string;
  alignment?: string;
  showCancel?: boolean;
  cancelLabel?: string;
  cancelButtonType?: string;
}

/**
 * Form field interface for form builder.
 */
export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  inputType?: string;
  placeholder?: string;
  options?: OptionItem[];
  buttonType?: string;
  disabled?: boolean;
  alignment?: string;
  showCancel?: boolean;
  cancelLabel?: string;
  cancelButtonType?: string;
}

/**
 * Form row interface for form builder.
 */
export interface FormRow {
  id: string;
  fields: FormField[];
}

/**
 * Field setting definition for form builder.
 */
export interface FieldSettingDefinition {
  key: string;
  label: string;
  type:
    | 'text'
    | 'number'
    | 'boolean'
    | 'date'
    | 'checkbox'
    | 'select'
    | 'dynamic-options';
  options?: OptionItem[];
}

/**
 * Option item interface for form builder.
 */
export interface OptionItem {
  label: string;
  value: string;
}

/**
 * User interface for authentication.
 */
export interface User {
  username: string;
  role: 'admin' | 'user';
}
