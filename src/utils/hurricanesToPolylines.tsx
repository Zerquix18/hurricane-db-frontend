import { Hurricane, Polyline } from 'models';

const hurricanesToPolylines = (hurricanes: Hurricane[]): Polyline[] => {
  const polylines: Polyline[] = [];

  hurricanes.forEach(hurricane => {
    const id = `hurricane-${hurricane.id}`;
    const path = (hurricane.positions || []).map(({ latitude, longitude }) => ({ lat: latitude, lng: longitude }));

    const polyline: Polyline = {
      id,
      path,
      thickness: 0.5,
    };

    polylines.push(polyline);
  });

  return polylines;
}

export default hurricanesToPolylines;
