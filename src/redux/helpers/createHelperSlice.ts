import { createSlice, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';

/**
 * Creates a typed helper slice.
 * @param name The name of the slice
 * @param initialState The initial state of the slice
 * @param reducers The reducer functions for the slice
 * @returns An object containing the reducer and actions
 */
export function createHelperSlice<
  State,
  Reducers extends SliceCaseReducers<State>
>(
  name: string,
  initialState: State,
  reducers: ValidateSliceCaseReducers<State, Reducers>
) {
  const slice = createSlice({
    name,
    initialState,
    reducers,
  });

  return {
    reducer: slice.reducer,
    actions: slice.actions,
  };
}
