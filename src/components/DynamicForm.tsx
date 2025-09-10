import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormField {
  name: string;
  type: 'text' | 'email' | 'number' | 'password' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'date';
  label: string;
  validation: Yup.AnySchema;
  options?: { value: string; label: string }[]; // for select and radio types
  styles?: {
    container?: string;
    label?: string;
    input?: string;
    error?: string;
  };
}

interface DynamicFormProps {
  formFields: FormField[];
  handleSubmit: (values: Record<string, any>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formFields, handleSubmit }) => {
  const validationSchema = formFields.reduce((schema, field) => {
    schema[field.name] = field.validation;
    return schema;
  }, {} as Record<string, Yup.AnySchema>);

  const initialValues = formFields.reduce((values, field) => {
    if (field.type === 'checkbox') {
      values[field.name] = false;
    } else {
      values[field.name] = '';
    }
    return values;
  }, {} as Record<string, any>);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape(validationSchema)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {formFields.map((field) => (
            <div key={field.name} className={field.styles?.container}>
              <label htmlFor={field.name} className={field.styles?.label}>{field.label}</label>
              {field.type === 'textarea' ? (
                <Field as="textarea" name={field.name} id={field.name} className={field.styles?.input} />
              ) : field.type === 'select' ? (
                <Field as="select" name={field.name} id={field.name} className={field.styles?.input}>
                  <option value="">Select an option</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              ) : field.type === 'radio' ? (
                field.options?.map((option) => (
                  <div key={option.value}>
                    <Field type="radio" name={field.name} value={option.value} id={`${field.name}_${option.value}`} className={field.styles?.input} />
                    <label htmlFor={`${field.name}_${option.value}`}>{option.label}</label>
                  </div>
                ))
              ) : (
                <Field type={field.type} name={field.name} id={field.name} className={field.styles?.input} />
              )}
              <ErrorMessage name={field.name} component="div" className={field.styles?.error} />
            </div>
          ))}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;

/* usage:

import React from 'react';
import DynamicForm from './DynamicForm';
import * as Yup from 'yup';

const ParentComponent: React.FC = () => {
  const formFields: FormField[] = [
    { name: 'firstName', type: 'text', label: 'First Name', validation: Yup.string().required('First Name is required'), styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md', error: 'text-red-500 text-sm mt-1' } },
    { name: 'lastName', type: 'text', label: 'Last Name', validation: Yup.string().required('Last Name is required'), styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md', error: 'text-red-500 text-sm mt-1' } },
    { name: 'email', type: 'email', label: 'Email', validation: Yup.string().email('Invalid email format').required('Email is required'), styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md', error: 'text-red-500 text-sm mt-1' } },
    { name: 'password', type: 'password', label: 'Password', validation: Yup.string().required('Password is required'), styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md', error: 'text-red-500 text-sm mt-1' } },
    { name: 'age', type: 'number', label: 'Age', validation: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'), styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md', error: 'text-red-500 text-sm mt-1' } },
    { name: 'birthDate', type: 'date', label: 'Birth Date', validation: Yup.date().required('Birth Date is required'), styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md', error: 'text-red-500 text-sm mt-1' } },
    { name: 'gender', type: 'radio', label: 'Gender', validation: Yup.string().required('Gender is required'), options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }], styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mr-2 leading-tight', error: 'text-red-500 text-sm mt-1' } },
    { name: 'hobby', type: 'select', label: 'Hobby', validation: Yup.string().required('Hobby is required'), options: [{ value: 'reading', label: 'Reading' }, { value: 'travelling', label: 'Travelling' }], styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md', error: 'text-red-500 text-sm mt-1' } },
    { name: 'newsletter', type: 'checkbox', label: 'Subscribe to Newsletter', validation: Yup.boolean(), styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mr-2 leading-tight', error: 'text-red-500 text-sm mt-1' } },
    { name: 'bio', type: 'textarea', label: 'Bio', validation: Yup.string().required('Bio is required'), styles: { container: 'mb-4', label: 'block text-sm font-medium text-gray-700', input: 'mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md', error: 'text-red-500 text-sm mt-1' } },
  ];

  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form data', values);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dynamic Form Example</h1>
      <DynamicForm formFields={formFields} handleSubmit={handleSubmit} />
    </div>
  );
};

export default ParentComponent;

*/