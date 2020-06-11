import { Hurricane } from 'models';

const getHurricaneName = (hurricane: Hurricane): string => {
  const { name, positions } = hurricane;
  
  const speeds = (positions || []).map(position => position.wind_speed || 0);
  const maxSpeed = Math.max(...speeds);
  let prefix = '';

  if (maxSpeed > 64) {
    prefix = 'Hurricane';
  } else if (maxSpeed > 35) {
    prefix = 'Tropical Storm';
  } else {
    prefix = 'Tropical Depression';
  }

  return `${prefix} ${name}`;
};

export default getHurricaneName;
