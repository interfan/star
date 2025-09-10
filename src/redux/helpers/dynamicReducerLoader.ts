import { Reducer, AnyAction, combineReducers } from '@reduxjs/toolkit';
import { Store } from 'redux';

interface ReducerManager {
  add: (key: string, reducer: Reducer) => void;
  remove: (key: string) => void;
  getReducers: () => Record<string, Reducer>;
  reduce: Reducer;
}

let currentReducers: Record<string, Reducer> = {};

/**
 * Dynamically injects a reducer into the store.
 * @param store The Redux store instance
 * @param key The key under which the reducer will be added
 * @param reducer The reducer function to inject
 */
export function injectReducer(
  store: Store & { reducerManager?: ReducerManager },
  key: string,
  reducer: Reducer
): void {
  if (!currentReducers[key]) {
    currentReducers[key] = reducer;

    // Combine current reducers into a single root reducer
    const combinedReducer = combineReducers(currentReducers);

    // Replace the store's reducer with the new combined reducer
    store.replaceReducer(combinedReducer);
  }
}

/**
 * Creates a reducer manager to handle dynamic reducer injection.
 * @param initialReducers Initial reducers for the Redux store
 */
export function createReducerManager(
  initialReducers: Record<string, Reducer>
): ReducerManager {
  currentReducers = { ...initialReducers };

  const combinedReducer = combineReducers(currentReducers);

  return {
    // Add a new reducer
    add: (key, reducer) => {
      if (!key || currentReducers[key]) {
        return;
      }
      currentReducers[key] = reducer;
    },

    // Remove a reducer
    remove: (key) => {
      if (!key || !currentReducers[key]) {
        return;
      }
      delete currentReducers[key];
    },

    // Get the current reducers
    getReducers: () => ({ ...currentReducers }),

    // Reducer function to be passed to the Redux store
    reduce: (state: any, action: AnyAction) => {
      const reducer = combineReducers(currentReducers);
      return reducer(state, action);
    },
  };
}


// import { store } from './store';
// import { dropdownReducer } from '../features/dropdownSlice';

// // Dynamically add the dropdown reducer
// (store as any).reducerManager.add('dropdown', dropdownReducer);

// // Replace the store's root reducer to include the new reducer
// store.replaceReducer((store as any).reducerManager.reduce);



// (store as any).reducerManager.remove('dropdown');

// // Replace the store's root reducer to exclude the removed reducer
// store.replaceReducer((store as any).reducerManager.reduce);


// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { store } from '../redux/store';
// import { dropdownReducer, dropdownActions } from '../features/dropdownSlice';

// const DropdownFeature: React.FC = () => {
//   const dispatch = useDispatch();
//   const selectedOption = useSelector((state: any) => state.dropdown?.selectedOption);

//   useEffect(() => {
//     // Dynamically add the reducer when this component mounts
//     (store as any).reducerManager.add('dropdown', dropdownReducer);
//     store.replaceReducer((store as any).reducerManager.reduce);

//     // Optionally clean up by removing the reducer when the component unmounts
//     return () => {
//       (store as any).reducerManager.remove('dropdown');
//       store.replaceReducer((store as any).reducerManager.reduce);
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Dropdown Feature</h2>
//       <select
//         value={selectedOption || ''}
//         onChange={(e) => dispatch(dropdownActions.selectOption(e.target.value))}
//       >
//         <option value="">Select an option</option>
//         <option value="option1">Option 1</option>
//         <option value="option2">Option 2</option>
//         <option value="option3">Option 3</option>
//       </select>
//       {selectedOption && <p>Selected Option: {selectedOption}</p>}
//     </div>
//   );
// };

// export default DropdownFeature;