import React from 'react';
import { Map as GoogleMap } from 'UI';
import { useMap, useMode } from 'hooks';
import { Simulation } from './controls';

const MapArea: React.FC = () => {
  const { center, zoom, markers, polylines } = useMap();
  const modeState = useMode();

  const controls = [];

  // forcing a re-mount when the mode changes

  let key = 'regular-map'

  if (modeState.mode.mode === 'hurricane' && modeState.mode.hurricane) {
    key = `hurricane-${modeState.mode.hurricane.id}`;
    controls.push({
      position: 'BOTTOM_CENTER',
      component: <Simulation hurricanes={[modeState.mode.hurricane]} />
    });
  }

  if (modeState.mode.mode === 'season' && modeState.mode.season) {
    key = `hurricane-${modeState.mode.season.year}`;
    const component = modeState.mode.season ? <Simulation hurricanes={modeState.mode.season.systems} /> : <></>;
    controls.push({
      position: 'BOTTOM_CENTER',
      component,
    });
  }

  return (
    <div id="hurricane-db-map">
      <GoogleMap
        key={key}
        mapTypeId="satellite"
        center={center}
        zoom={zoom}
        markers={markers}
        polylines={polylines}
        controls={controls}
      />
    </div>
  );
};

export default MapArea;
