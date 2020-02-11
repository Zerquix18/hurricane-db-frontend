import { useContext } from 'react';
import { AppStateContext } from 'providers';
import { Hurricane } from 'models';

type HurricaneLoaders = {
  loadedHurricane?: boolean;
  loadedPositions?: boolean;
  loadedWindspeeds?: boolean;
}

const useMode = () => {
  const { state, dispatch } = useContext(AppStateContext);

  return {
    currentMode: state.mode.mode,
    mode: state.mode,

    setHurricaneMode: () => dispatch({ type: 'SET_MODE_HURRICANE' }),
    setHurricane: (hurricane: Hurricane) => dispatch({ type: 'HURRICANE_MODE_SET_HURRICANE', hurricane }),
    setHurricaneLoading: (hurricaneLoaders: HurricaneLoaders) => dispatch({ type: 'HURRICANE_MODE_SET_LOADING', ...hurricaneLoaders }),
    setHurricaneError: (error: string) => dispatch({ type: 'HURRICANE_MODE_SET_ERROR', error }),
    
  }
}

export default useMode;
