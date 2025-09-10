import * as Yup from 'yup';

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'number' | 'password' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'date';
  label: string;
  validation: Yup.AnySchema; // Validation schema for the field
  options?: { value: string; label: string }[]; // Options for select, radio, etc.
  styles?: {
    container?: string; // Optional styles for the container
    label?: string; // Optional styles for the label
    input?: string; // Optional styles for the input field
    error?: string; // Optional styles for the error message
  };
}
