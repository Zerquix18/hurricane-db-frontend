import React from 'react';
import { Map as GoogleMap } from 'UI'

// The Atlantic, for now.
const defaultCenter = {
  lat: 21.902656006558043,
  lng: -72.88469006709305,
};

const defaultZoom = 5;

const MapArea: React.FC = () => {
  return (
    <GoogleMap
      center={defaultCenter}
      zoom={defaultZoom}
    />
  );
};

export default MapArea;
