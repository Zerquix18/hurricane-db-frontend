import { useContext } from 'react';
import { AppStateContext } from 'providers';
import { LatLng, Marker, Polyline } from 'models';

const useMap = () => {
  const { state, dispatch } = useContext(AppStateContext);

  return {
    zoom: state.map.zoom,
    center: state.map.center,
    markers: state.map.markers,
    polylines: state.map.polylines,

    setZoom: (zoom: number) => dispatch({ type: 'SET_ZOOM', zoom }),
    setCenter: (center: LatLng) => dispatch({ type: 'SET_CENTER', ...center }),
    setMarkers: (markers: Marker[]) => dispatch({ type: 'SET_MARKERS', markers }),
    setPolylines: (polylines: Polyline[]) => dispatch({ type: 'SET_POLYLINES', polylines }),

  }
}

export default useMap;
