// import React from 'react';
// import DynamicForm from './DynamicForm';
// import * as Yup from 'yup';
// import { FormField } from '../types';
// import { useAppDispatch, useAppSelector } from '../redux/helpers/hooks';
// import { dropdownActions } from '../features/dropdownSlice';

// const DropdownForm: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const selectedOption = useAppSelector((state) => state.dropdown.selectedOption);

//   const formFields: FormField[] = [
//     {
//       name: 'dropdown',
//       type: 'select',
//       label: 'Select an option:',
//       validation: Yup.string().required('This field is required'),
//       options: [
//         { value: 'option1', label: 'Option 1' },
//         { value: 'option2', label: 'Option 2' },
//         { value: 'option3', label: 'Option 3' },
//       ],
//       styles: {
//         container: 'form-group',
//         label: 'form-label',
//         input: 'form-select',
//         error: 'form-error',
//       },
//     },
//   ];

//   const handleSubmit = (values: Record<string, any>) => {
//     dispatch(dropdownActions.selectOption(values.dropdown));
//   };

//   return (
//     <div>
//       <h2>Dropdown Form</h2>
//       <DynamicForm formFields={formFields} handleSubmit={handleSubmit} />
//       {selectedOption && <p>Selected Option: {selectedOption}</p>}
//     </div>
//   );
// };

// export default DropdownForm;
import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../redux/helpers/hooks';
import { dropdownActions } from '../features/dropdownSlice';

const DropdownForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector((state) => state.dropdown.selectedOption);
  const [dropdownValue, setDropdownValue] = React.useState(selectedOption || '');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setDropdownValue(value);
    dispatch(dropdownActions.selectOption(value));
  };

  return (
    <Box sx={{ minWidth: 300, margin: '1rem auto', textAlign: 'center' }}>
      <h2>Dropdown Form</h2>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label">Select an option</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          value={dropdownValue}
          onChange={handleChange}
          label="Select an option"
        >
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>
      {dropdownValue && (
        <Box sx={{ marginTop: 2 }}>
          <p>Selected Option: {dropdownValue}</p>
        </Box>
      )}
    </Box>
  );
};

export default DropdownForm;
