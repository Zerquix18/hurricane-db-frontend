import React from 'react';
import { Marker, Hurricane } from 'models';
import format from 'date-fns/format';
import { getUserTimezone } from 'utils';

const icons = {
  tropicalDepression: '/img/trop-depression.png',
  tropicalStorm: '/img/trop-storm.png',
  category1: '/img/cat-1.png',
  category2: '/img/cat-2.png',
  category3: '/img/cat-3.png',
  category4: '/img/cat-4.png',
  category5: '/img/cat-5.png',
};

const hurricaneIcon = '/img/hurricane-icon.png';

const positionsToMarkers = (hurricane: Hurricane): Marker[] => {
  const markers: Marker[] = [];

  if (hurricane.positions === null || hurricane.positions.length === 0) {
    return markers;
  }
  
  hurricane.positions.forEach(position => {
    const id = `position-${position.id}`;
    const lat = position.latitude;
    const lng = position.longitude;
    let url, classification

    // kt!
    if (position.wind_speed > 134) {
      url = icons.category5;
      classification = 'Category 5 hurricane';
    } else if (position.wind_speed > 114) {
      url = icons.category4;
      classification = 'Category 4 hurricane';
    } else if (position.wind_speed > 96) {
      url = icons.category3;
      classification = 'Category 3 hurricane';
    } else if (position.wind_speed > 83) {
      url = icons.category2;
      classification = 'Category 2 hurricane';
    } else if (position.wind_speed > 64) {
      url = icons.category1;
      classification = 'Category 1 hurricane';
    } else if (position.wind_speed > 35) {
      url = icons.tropicalStorm;
      classification = 'Tropical Storm';
    } else {
      url = icons.tropicalDepression;
      classification = 'Tropical Depression';
    }

    const defaultDescription = (
      <div>
        <strong>Date: </strong>{ format(new Date(position.moment), 'MMMM d, yyyy')}<br />
        <strong>Time: </strong>{ format(new Date(position.moment), 'HH:kk ') } { getUserTimezone() }<br />
        <strong>Classification: </strong>{ classification } <br />
        <strong>Wind Speed: </strong> { position.wind_speed } kt<br />
        <strong>Pressure: </strong> { position.pressure } mb
      </div>
    );

    const marker = {
      id,
      lat,
      lng,
      url,
      defaultDescription,
    };
    markers.push(marker);
  });

  const lastPosition = hurricane.positions[hurricane.positions.length - 1];

  const defaultDescription = (
    <>
      <h3>{ hurricane.name }</h3>
    </>
  );

  const hurricaneMarker: Marker = {
    id: `hurricane-${hurricane.id}`,
    lat: lastPosition.latitude,
    lng: lastPosition.longitude,
    url: hurricaneIcon,
    defaultDescription,
    scale: 2
  };

  markers.push(hurricaneMarker);

  return markers;
}

export default positionsToMarkers;
