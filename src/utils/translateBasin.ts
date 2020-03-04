type Basin = 'atlantic' | 'eatern_pacific' | 'western_pacific' | 'southern_pacific' | 'indian' | 'australian_region';

const translateBasin = (basin: Basin) => {
  const basins = {
    atlantic: 'Atlantic',
    eatern_pacific: 'Eastern Pacific',
    western_pacific: 'Western Pacific',
    southern_pacific: 'Central Pacific',
    indian: 'Indian Ocean',
    australian_region: 'Australian Region',
  };

  return basins[basin];
}

export default translateBasin;
