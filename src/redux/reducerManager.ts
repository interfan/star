import { combineReducers, Reducer } from '@reduxjs/toolkit';

export function createReducerManager(initialReducers: Record<string, Reducer>) {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);

  return {
    getReducerMap: () => reducers,
    reduce: (state: any, action: any) => combinedReducer(state, action),
    add: (key: string, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: string) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      combinedReducer = combineReducers(reducers);
    },
  };
}
