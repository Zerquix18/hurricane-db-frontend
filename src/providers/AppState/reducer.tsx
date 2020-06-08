import { AppState, Season } from 'models';
import { positionsToMarkers, hurricanesToPolylines, getHurricaneDefaultPosition } from 'utils';

type ReducerAction = (
  'SET_ZOOM' |
  'SET_CENTER' |
  'SET_MARKERS' |
  'SET_POLYLINES' |
  'SET_LOADED' |

  // Set modes
  'SET_MODE_NONE' |

  'SET_MODE_HURRICANE' |
  'HURRICANE_MODE_SET_HURRICANE' |
  'HURRICANE_MODE_SET_LOADING' |
  'HURRICANE_MODE_SET_ERROR' |

  'SET_MODE_SEASON' |
  'SEASON_MODE_SET_SEASON' |
  'SEASON_MODE_SET_LOADING' |
  'SEASON_MODE_SET_ERROR' |


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
    case 'SET_POLYLINES':
      return {
        ...state,
        map: {
          ...state.map,
          polylines: action.polylines,
        }
      };
    case 'SET_LOADED':
      return {
        ...state,
        map: {
          ...state.map,
          loaded: action.loaded,
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

    case 'HURRICANE_MODE_SET_HURRICANE': {
      if (state.mode.mode !== 'hurricane') {
        return state;
      }
      const positions = action.hurricane.positions
      let center = state.map.center
      let zoom = state.map.zoom
      if (state.map.loaded && positions) {
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
          markers: positionsToMarkers([action.hurricane]),
          polylines: hurricanesToPolylines([action.hurricane]),
          center,
          zoom,
        }
      };
    }
    case 'HURRICANE_MODE_SET_LOADING': {
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
    }
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

      case 'SET_MODE_SEASON':
        return {
          ...state,
          mode: {
            mode: 'season',
            season: null,
            loading: true,
            error: '',
          }
        };
  
      case 'SEASON_MODE_SET_SEASON':
        if (state.mode.mode !== 'season') {
          return state;
        }
        const season = action.season as Season;
        const hurricanes = season.systems || [];
        const positions = hurricanes.map(system => {
          return system.positions || [];
        }).flat();

        let center = state.map.center
        let zoom = state.map.zoom
        if (state.map.loaded && positions) {
          const position = getHurricaneDefaultPosition(positions);
          center = position.center
          zoom = position.zoom
        }

        return {
          ...state,
          mode: {
            ...state.mode,
            season: action.season,
            loading: false,
          },
          map: {
            ...state.map,
            markers: positionsToMarkers(hurricanes),
            polylines: hurricanesToPolylines(hurricanes),
            center,
            zoom,
          }
        };
      case 'SEASON_MODE_SET_LOADING':
        return {
          ...state,
          mode: {
            ...state.mode,
            ...action.loading,
          }
        };
      case 'SEASON_MODE_SET_ERROR':
        if (state.mode.mode !== 'season') {
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
