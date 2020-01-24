import React from 'react';
import { LatLng } from 'models';

class Marker {
    id: string;
    url: string; // image URL
    lat: number;
    lng: number;
    
    label?: string;

    defaultDescription?: string | React.ReactNode; // optionally open
    description?: string | React.ReactNode; // ALWAYS OPEN

    forceShowDescription?: boolean;
    angle?: number; // degrees
    scale?: number;
    elevation?: number; // meters
    isVisible?: boolean;
    canUndoDrag?: boolean;

    aggregated?: boolean;
    draggable?: boolean;
    restrictZoom?: boolean;

    onDrag?: (position: LatLng) => void;
    onDragEnd?(marker: Marker, event: any): void;
    onUndoDrag?(marker: Marker, position: LatLng): void;
    onClick?(marker: Marker): void;
    onDescriptionOpen?: (marker: Marker) => void;
    onDescriptionClosed?: (marker: Marker) => void;

    reference?: any; // original element used to add this to the map.
}

export default Marker;
