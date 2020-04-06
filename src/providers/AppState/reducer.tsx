import { AppState } from 'models';
import { positionsToMarkers, hurricanesToPolylines, getHurricaneDefaultPosition } from 'utils';

type ReducerAction = (
  'SET_ZOOM' |
  'SET_CENTER' |
  'SET_MARKERS' |

  // Set modes
  'SET_MODE_NONE' |

  'SET_MODE_HURRICANE' |
  'HURRICANE_MODE_SET_HURRICANE' |
  'HURRICANE_MODE_SET_LOADING' |
  'HURRICANE_MODE_SET_ERROR' |

  'SETTINGS_SET_UNITS'

  // ..
)

interface StrictActionParam {
  type: ReducerAction;
}

export interface ActionParam extends StrictActionParam {
  [key: string]: any
}

const reducer = (state: AppState, action: ActionParam): AppState => {  
  switch (action.type) {
    case 'SET_CENTER':
      return {
        ...state,
        map: {
          ...state.map,
          center: {
            lat: action.lat,
            lng: action.lng
          }
        }
      };
    case 'SET_ZOOM':
      return {
        ...state,
        map: {
          ...state.map,
          zoom: action.zoom,
        }
      };
    case 'SET_MARKERS':
      return {
        ...state,
        map: {
          ...state.map,
          markers: action.markers,
        }
      };
    
    case 'SET_MODE_HURRICANE':
      return {
        ...state,
        mode: {
          mode: 'hurricane',
          hurricane: null,
          loading: true,
          error: '',
        }
      };

    case 'HURRICANE_MODE_SET_HURRICANE':
      if (state.mode.mode !== 'hurricane') {
        return state;
      }
      const positions = action.hurricane.positions
      let center = state.map.center
      let zoom = state.map.zoom
      if (positions) {
        const position = getHurricaneDefaultPosition(positions);
        center = position.center
        zoom = position.zoom
      }
      return {
        ...state,
        mode: {
          ...state.mode,
          hurricane: action.hurricane,
          loading: false,
        },
        map: {
          ...state.map,
          markers: positionsToMarkers(action.hurricane),
          polylines: hurricanesToPolylines([action.hurricane]),
          center,
          zoom,
        }
      };
    case 'HURRICANE_MODE_SET_LOADING':
      if (state.mode.mode !== 'hurricane') {
        return state;
      }
      return {
        ...state,
        mode: {
          ...state.mode,
          ...action.loading,
        }
      };
    case 'HURRICANE_MODE_SET_ERROR':
      if (state.mode.mode !== 'hurricane') {
        return state;
      }
      return {
        ...state,
        mode: {
          ...state.mode,
          error: action.error,
        }
      };
    case 'SETTINGS_SET_UNITS':
      return {
        ...state,
        settings: {
          ...state.settings,
          units: {
            ...state.settings.units,
            ...action.payload
          }
        }
      }
    
    default:
      throw new Error("This will never happen hahaha (i hope pls)")
  }
}

export default reducer;
