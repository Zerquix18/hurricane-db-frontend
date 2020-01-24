import React from 'react';
import { LatLng } from 'models';

class Polygon {
  id: string;
  color: string;
  borderColor: string;
  path: LatLng[];

  defaultDescription?: string | React.ReactNode; // optionally open
  opacity?: number;
  borderOpacity?: number;
  borderWeight?: number;
  elevation?: number;

  isVisible?: boolean;
  reference?: any;

  draggable?: boolean;
  editable?: boolean;

  onClick?: (e: any, polygon: Polygon) => void;
  onEdited?: (path: LatLng[], polygon: Polygon) => void;
  onDragEnd?: (path: LatLng[], polygon: Polygon) => void;
}

export default Polygon;
