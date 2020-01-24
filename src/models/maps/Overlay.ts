import { BoundingBox } from 'models';

class Overlay {
  id: string;
  url: string;
  bounds: BoundingBox;
  angle?: number;
  elevation?: number;
  isVisible?: boolean;

  onClick?(overlay: Overlay): void;
  reference?: any; // original element used to add this to the map.
}

export default Overlay
