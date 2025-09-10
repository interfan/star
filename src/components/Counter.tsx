import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/helpers/hooks';
import { counterActions } from '../features/counterSlice';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <h1>Counter: {value}</h1>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={() => dispatch(counterActions.increment())}>
            <AddIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={() => dispatch(counterActions.decrement())}>
            <RemoveIcon />
          </IconButton>
      <button onClick={() => dispatch(counterActions.increment())}>+</button>
      <button onClick={() => dispatch(counterActions.decrement())}>-</button>
    </div>
  );
};

export default Counter;
