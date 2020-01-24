import { LatLng } from 'models';

class MapText {
  id: string;
  text: string;
  lat: number;
  lng: number;

  color?: string;
  size?: number;

  borderColor?: string;
  borderSize?: number;
  elevation?: number;

  isVisible?: boolean;
  reference?: any;

  draggable?: boolean;

  onClick?: (e: any, mapText: MapText) => void;
  onDragEnd?: (position: LatLng, mapText: MapText) => void;
}

export default MapText;
