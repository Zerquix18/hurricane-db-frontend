import { AppState } from 'models';

type ReducerAction = (
  'SET_ZOOM' |
  'SET_CENTER'
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

    default:
      throw new Error("This will never happen hahaha (i hope pls)")
  }
}

export default reducer;
