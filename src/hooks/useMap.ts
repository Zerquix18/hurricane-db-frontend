import { useContext } from 'react';
import { AppStateContext } from 'providers';
import { LatLng } from 'models';

const useMap = () => {
  const { state, dispatch } = useContext(AppStateContext);

  return {
    zoom: state.map.zoom,
    center: state.map.center,

    setZoom: (zoom: number) => dispatch({ type: 'SET_ZOOM', zoom }),
    setCenter: (center: LatLng) => dispatch({ type: 'SET_CENTER', ...center })
  }
}

export default useMap;
