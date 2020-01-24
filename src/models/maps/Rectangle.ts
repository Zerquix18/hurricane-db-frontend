import { LatLng, BoundingBox } from 'models';

class Rectangle {
  id: string;
  bounds: BoundingBox;
  color: string;
  
  borderColor?: string;
  opacity?: number;
  borderOpacity?: number;
  borderWeight?: number;
  elevation?: number;


  isVisible?: boolean;
  reference?: any;

  draggable?: boolean;
  editable?: boolean;

  onClick?: (e: any, rectangle: Rectangle) => void;
  onEdited?: (bounds: BoundingBox, rectangle: Rectangle) => void;
  onDragEnd?: (position: LatLng, rectangle: Rectangle) => void;
}

export default Rectangle;
