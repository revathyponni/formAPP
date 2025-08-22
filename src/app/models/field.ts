export interface FieldTypeDefinition {
  type: string;
  label: string;
  icon: string;
  defaultConfig: DefaultConfig;
  component: any;
  settingsConfig?: FieldSettingDefinition[];
}

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

export interface FormRow {
  id: string;
  fields: FormField[];
}

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

export interface OptionItem {
  label: string;
  value: string;
}
