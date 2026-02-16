export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  [key: string]: any; // Allow extensibility
}

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date';

export interface ValidationRule {
  required?: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  validate?: (value: any) => string | boolean;
}

export interface FieldSchema {
  key: keyof User;
  label: string;
  type: FieldType;
  placeholder?: string;
  validation?: ValidationRule;
  required?: boolean; // For UI display (asterisk)
  gridSize?: number; // Grid column span (out of 12)
  defaultValue?: string | number;
}
