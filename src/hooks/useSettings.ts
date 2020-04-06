import { useContext } from 'react';
import { AppStateContext } from 'providers';
import { SpeedUnit, DistanceUnit, PressureUnit } from 'models';

interface SetUnitArgs {
  distance?: DistanceUnit;
  speed?: SpeedUnit;
  pressure?: PressureUnit;
}

const useSettings = () => {
  const { state, dispatch } = useContext(AppStateContext);

  return {
    ...state.settings,
    setUnit: (payload: SetUnitArgs) => dispatch({ type: 'SETTINGS_SET_UNITS', payload }),
  }
}

export default useSettings;
