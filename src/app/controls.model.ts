export enum ControlType {
  SELECT = 'select',
  TEXT = 'text',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DATE = 'date',
  RANGE = 'range',
}

export interface ControlValidations {
  required?: boolean | { expression: string };
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp | string;
}

export interface Control {
  type: ControlType;
  name: string;
  label: string;
  value: number | string | boolean | Date;
  validations: ControlValidations;
  disabled?: boolean;
  range?: {
    min: number;
    max: number;
    step?: number;
  };
  options?: {
    label: string;
    value: number | boolean | string;
    name?: string;
    disabled?: boolean;
  }[];
}
