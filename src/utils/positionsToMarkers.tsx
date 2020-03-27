import React from 'react';
import { HurricanePosition, Marker } from 'models';

const icons = {
  tropicalDepression: '/img/trop-depression.png',
  tropicalStorm: '/img/trop-storm.png',
  category1: '/img/cat-1.png',
  category2: '/img/cat-2.png',
  category3: '/img/cat-3.png',
  category4: '/img/cat-4.png',
  category5: '/img/cat-5.png',
};

const positionsToMarkers = (positions: HurricanePosition[]): Marker[] => {
  const markers: Marker[] = [];
  
  positions.forEach(position => {
    const id = `position-${position.id}`;
    const lat = position.latitude;
    const lng = position.longitude;
    let url

    // kt!
    if (position.wind_speed > 134) {
      url = icons.category5;
    } else if (position.wind_speed > 114) {
      url = icons.category4;
    } else if (position.wind_speed > 96) {
      url = icons.category3;
    } else if (position.wind_speed > 83) {
      url = icons.category2;
    } else if (position.wind_speed > 64) {
      url = icons.category1;
    } else if (position.wind_speed > 35) {
      url = icons.tropicalStorm;
    } else {
      url = icons.tropicalDepression;
    }

    const marker = {
      id,
      lat,
      lng,
      url,
    };
    markers.push(marker);
  });

  return markers;
}

export default positionsToMarkers;
