import { HurricanePosition, LatLng } from "models";

declare var window: any;

interface Position {
  center: LatLng;
  zoom: number;
}

const ZOOM_MAX = 21;

const getHurricaneDefaultPosition = (positions: HurricanePosition[]): Position => {
  const bounds = new window.google.maps.LatLngBounds();

  positions.forEach(position => {
    const { latitude, longitude } = position;
    const latLng = new window.google.maps.LatLng(latitude, longitude);
    bounds.extend(latLng);
  });
  
  const boundsCenter = bounds.getCenter();

  const center = {
    lat: boundsCenter.lat(),
    lng: boundsCenter.lng(),
  };

  const WORLD_DIM = { height: 256, width: 256 };
  const mapDim = document.getElementById('hurricane-db-map')!.getBoundingClientRect();

  const latRad = (lat: number) => {
    const sin = Math.sin(lat * Math.PI / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  };

  const getZoom = (mapPx: number, worldPx: number, fraction: number) => {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  };

  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

  const lngDiff = ne.lng() - sw.lng();
  const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

  const latZoom = getZoom(mapDim.height, WORLD_DIM.height, latFraction);
  const lngZoom = getZoom(mapDim.width, WORLD_DIM.width, lngFraction);

  const zoom = Math.min(latZoom, lngZoom, ZOOM_MAX);

  return { center, zoom };
}

export default getHurricaneDefaultPosition;
