import { LatLng } from 'models';

class Circle {
  id: string;
  color: string; // #hex
  radius: number; // meters
  lat: number;
  lng: number;

  opacity?: number;

  borderColor?: string; // #hex 
  borderOpacity?: number;
  borderWeight?: number;
  elevation?: number;
  
  isVisible?: boolean;
  reference?: any;
  
  editable?: boolean;
  draggable?: boolean;

  onClick?: (e: any, circle: Circle) => void;
  onEdited?: (radius: number, circle: Circle) => void;
  onDragEnd?: (position: LatLng, circle: Circle) => void;

}

export default Circle;
