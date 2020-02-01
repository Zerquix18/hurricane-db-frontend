import React from 'react';
import { Map as GoogleMap } from 'UI'
import { useMap } from 'hooks';

const MapArea: React.FC = () => {
  const { center, zoom } = useMap();
  
  return (
    <GoogleMap
      center={center}
      zoom={zoom}
    />
  );
};

export default MapArea;
