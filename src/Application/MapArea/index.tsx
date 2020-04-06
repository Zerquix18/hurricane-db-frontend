import React from 'react';
import { Map as GoogleMap } from 'UI';
import { useMap, useMode } from 'hooks';
import { Simulation } from './controls';

const MapArea: React.FC = () => {
  const { center, zoom, markers, polylines } = useMap();
  const modeState = useMode();

  const controls = [];

  if (modeState.mode.mode === 'hurricane') {
    controls.push({
      position: 'BOTTOM_CENTER',
      component: <Simulation hurricanes={[modeState.mode.hurricane!]} />
    });
  }

  return (
    <GoogleMap
      mapTypeId="satellite"
      center={center}
      zoom={zoom}
      markers={markers}
      polylines={polylines}
      controls={controls}
    />
  );
};

export default MapArea;
