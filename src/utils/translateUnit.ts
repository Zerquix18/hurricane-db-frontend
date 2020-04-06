import { SpeedUnit, DistanceUnit, PressureUnit } from 'models';

interface UnitIsDistance { // default is to be determined !! 
  type: 'distance';
  value: number;
  to: DistanceUnit;
}

interface UnitIsPressure { // default is mb
  type: 'pressure';
  value: number;
  to: PressureUnit;
}

interface UnitIsSpeed { // default is kt
  type: 'speed';
  value: number;
  to: SpeedUnit;
}

type Args = UnitIsDistance | UnitIsPressure | UnitIsSpeed;

const translateUnit = (args: Args): number => {
  const { type, value, to } = args;

  switch (type) {
    case 'distance':
      return value; // to determine default
    case 'pressure': {
      const results: {[key in PressureUnit]: number } = {
        mb: value,
        kpa: value * 0.1,
        atm: value * 0.000986923,
      };
      return parseFloat((results[to as PressureUnit]).toFixed(2));
    }
    case 'speed': {
      const results: {[key in SpeedUnit]: number } = {
        kt: value,
        kmh: value * 1.85200,
        mph: value * 1.15077945,
      };
      return parseFloat((results[to as SpeedUnit]).toFixed(2));
    };
  }
}

export default translateUnit;
