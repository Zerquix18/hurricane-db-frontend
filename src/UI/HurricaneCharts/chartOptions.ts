interface ChartData {
  t: Date;
  y: number;
}

const BLUE = '#5ebfff';
const RED = '#ff0000';

const chartOptions = (pressures: ChartData[], windSpeeds: ChartData[]) => {
  return {
    datasets: [
      {
        label: 'Pressure',
        borderColor: BLUE,
        data: pressures,
      },
      {
        label: 'Wind Speed',
        borderColor: RED,
        data: windSpeeds,
      },
    ],
  }
}

export default chartOptions;
