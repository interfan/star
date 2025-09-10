import { createHelperSlice } from '../redux/helpers/createHelperSlice';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const { reducer, actions } = createHelperSlice('counter', initialState, {
  increment: (state: CounterState) => {
    state.value += 1; // `state` is explicitly typed as `CounterState`
  },
  decrement: (state: CounterState) => {
    state.value -= 1; // `state` is explicitly typed as `CounterState`
  },
  reset: (state: CounterState) => {
    state.value = 0; // `state` is explicitly typed as `CounterState`
  },
});

export { reducer as counterReducer, actions as counterActions };
