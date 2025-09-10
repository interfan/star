import { createHelperSlice } from '../redux/helpers/createHelperSlice';

interface DropdownState {
  selectedOption: string;
}

const initialState: DropdownState = {
  selectedOption: '',
};

const { reducer, actions } = createHelperSlice('dropdown', initialState, {
  selectOption: (state, action: { payload: string }) => {
    state.selectedOption = action.payload;
  },
});

export { reducer as dropdownReducer, actions as dropdownActions };