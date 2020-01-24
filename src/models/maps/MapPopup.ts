import React from 'react';

// actually just an info window
class MapPopup {
  id: string;
  content: string | React.ReactNode;
  lat: number;
  lng: number;

  reference?: any;
  isVisible?: boolean;
  onClose?: () => void;
}

export default MapPopup;
