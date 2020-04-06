import { useContext } from 'react';
import { AppStateContext } from 'providers';

const useSettings = () => {
  const { state } = useContext(AppStateContext);

  return {
    ...state.settings,
  }
}

export default useSettings;
