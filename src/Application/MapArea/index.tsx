import React from 'react';
import { Map as GoogleMap } from 'UI'
import { useMap } from 'hooks';

const MapArea: React.FC = () => {
  const { center, zoom, markers, polylines } = useMap();

  return (
    <GoogleMap
      mapTypeId="satellite"
      center={center}
      zoom={zoom}
      markers={markers}
      polylines={polylines}
    />
  );
};

export default MapArea;
