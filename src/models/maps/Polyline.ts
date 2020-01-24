import { LatLng } from 'models';

class Polyline {
  id: string;
  path: LatLng[];

  color?: string; // #ffffff
  opacity?: number;
  thickness?: number;
  elevation?: number;    
  isVisible?: boolean;
  reference?: any;

  draggable?: boolean;
  editable?: boolean;

  onClick?: () => void;
  onEdited?: (newPath: LatLng[], polyline: Polyline) => void;
  onDragEnd?: (newPath: LatLng[], polyline: Polyline) => void;
}

export default Polyline;
