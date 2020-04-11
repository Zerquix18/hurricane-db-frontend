import { useContext } from 'react';
import { AppStateContext } from 'providers';
import { Hurricane, Season } from 'models';

const useMode = () => {
  const { state, dispatch } = useContext(AppStateContext);

  return {
    currentMode: state.mode.mode,
    mode: state.mode,

    setHurricaneMode: () => dispatch({ type: 'SET_MODE_HURRICANE' }),
    setHurricane: (hurricane: Hurricane) => dispatch({ type: 'HURRICANE_MODE_SET_HURRICANE', hurricane }),
    
    setSeasonMode: () => dispatch({ type: 'SET_MODE_SEASON' }),
    setSeason: (season: Season) => dispatch({ type: 'SEASON_MODE_SET_SEASON', season }),
  }
}

export default useMode;
