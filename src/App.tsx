import React from 'react';
import Counter from './components/Counter';
import DropdownForm from './components/DropdownForm';
import { Button, Typography, Box, Paper } from '@mui/material';
//import IconButton from '@mui/material/IconButton';
//import AddIcon from '@mui/icons-material/Add';
//import RemoveIcon from '@mui/icons-material/Remove';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Material-UI Typography */}
      <Typography variant="h3" component="h1" className="text-blue-500 mb-4">
        Redux Toolkit with TypeScript
      </Typography>

      {/* Material-UI Paper and Tailwind Utility Classes */}
      <Paper className="w-full max-w-3xl p-6 mb-6 shadow-md bg-white">
        <Typography variant="body1" className="mb-4">
          This app demonstrates a simple counter and dropdown form using Redux Toolkit, Material-UI, and Tailwind CSS.
        </Typography>

        {/* Counter Component */}
        <div className="mb-8">
          <Counter />
        </div>

        {/* Dropdown Form Component */}
        <div className="mb-8">
          <DropdownForm />
        </div>

        {/* Material-UI Button with Tailwind Utility Classes */}
        <Box className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Material-UI Button Styled with Tailwind
          </Button>
        </Box>
      </Paper>

      {/* Tailwind Button Example */}
      

<form className="max-w-sm mx-auto">
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </div>
  );
};

export default App;
