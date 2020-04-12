import { LatLng, HurricanePosition } from 'models';

declare var window: any;

const calculateHurricanePath = (positions: HurricanePosition[], date: Date): LatLng[] => {
  const currentTimestamp = date.getTime();

  const progress = positions.filter(position => {
    const positionTimestamp = new Date(position.moment).getTime();
    return positionTimestamp < currentTimestamp;
  });

  if (progress.length === 0) {
    const { latitude: lat, longitude: lng } = positions[0];
    return [{ lat, lng }];
  }

  const lastPoint = progress[progress.length - 1];
  const nextPoint = positions[progress.length + 1];

  if (! nextPoint) {
    const { latitude: lat, longitude: lng } = positions[progress.length - 1];
    return [{ lat, lng }];
  }

  const lastPointTime = new Date(lastPoint.moment).getTime();
  const nextPointTime = new Date(nextPoint.moment).getTime();

  const totalTime = nextPointTime - lastPointTime;
  const percentage = (currentTimestamp - lastPointTime) / totalTime;

  const lastPointLatLng = new window.google.maps.LatLng(lastPoint.latitude, lastPoint.longitude);
  const nextPointLatLng = new window.google.maps.LatLng(nextPoint.latitude, nextPoint.longitude);

  const position = window.google.maps.geometry.spherical.interpolate(lastPointLatLng, nextPointLatLng, percentage);

  const lat = position.lat();
  const lng = position.lng();

  const path = progress.map(({ latitude: lat, longitude: lng }) => ({ lat, lng }))
                       .concat({ lat, lng });

  return path;
};

export default calculateHurricanePath;
