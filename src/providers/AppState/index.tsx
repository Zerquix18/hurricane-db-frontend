import React, { createContext, useReducer } from 'react';
import { AppState } from 'models';
import reducer, { ActionParam } from './reducer';

const initialState: AppState = {
  mode: 'season',
  map: {
    center: { // Atlantic basin
      lat: 21.902656006558043,
      lng: -72.88469006709305,
    },
    zoom: 5,
    markers: [],
    polylines: []
  }
}

const defaultContextState = {
  state: initialState,
  dispatch: (params: ActionParam) => {
    void params
  }
}

const AppStateContext = createContext(defaultContextState);

interface AppStateProviderProps {
  children: React.ReactNode;
}

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={{state, dispatch}}>
      { children }
    </AppStateContext.Provider>
  )
};

export { AppStateProvider, AppStateContext };
