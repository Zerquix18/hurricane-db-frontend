import React, { useState } from 'react';
import { Hurricane } from 'models';
import { Button, Modal, Tab } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { useSettings } from 'hooks';
import { translateUnit, getDistance } from 'utils';

interface HurricaneChartsProps {
  hurricane: Hurricane;
}

const options = {
  scales: {
    xAxes: [{ type: 'time' }]
  }
};

const optionsForPressureAndWS = {
  scales: {
    xAxes: [{ type: 'time' }],
    yAxes: [{
      id: 'pressure',
      type: 'linear',
      position: 'left',
    }, {
      id: 'wind_speed',
      type: 'linear',
      position: 'right',
    }]
  }
}

const HurricaneCharts: React.FC<HurricaneChartsProps> = ({ hurricane }) => {
  const [modalOpen, changeModalOpen] = useState<boolean>(false);
  const settings = useSettings();

  const toggleModal = () => {
    changeModalOpen(! modalOpen);
  };

  const pressures = (hurricane.positions || [])
                       .filter(({ pressure }) => !! pressure)
                       .map(({ moment, pressure }) => ({
                          t: new Date(moment),
                          y: translateUnit({ type: 'pressure', to: settings.units.pressure, value: pressure })
                        }));

  const windSpeeds = (hurricane.positions || [])
                        .filter(({ wind_speed }) => !! wind_speed)
                        .map(({ moment, wind_speed }) => ({
                          t: new Date(moment),
                          y: translateUnit({ type: 'speed', to: settings.units.speed, value: wind_speed }),
                        }));

  const speeds = (hurricane.positions || []).map((position, index, array) => {
    if (index === 0) {
      return 0;
    }
    const previousPosition = array[index - 1];

    const previousLatLng = { lat: previousPosition.latitude, lng: previousPosition.longitude };
    const currentLatLng = { lat: position.latitude, lng: position.longitude };

    const previousTime = new Date(previousPosition.moment).valueOf() / 1000;
    const currentTime = new Date(position.moment).valueOf() / 1000;

    const distance = getDistance(previousLatLng, currentLatLng);
    const time = currentTime - previousTime;

    const speedInMeters = distance / time;
    const speed = translateUnit({ type: 'speed', to: settings.units.speed, value: speedInMeters });

    return { t: new Date(position.moment ), y: speed };
  }).slice(1);

  console.log(hurricane.positions)

  const ace = (hurricane.positions || []).filter(position => {
    const validHours = [0, 6, 12, 18];
    const moment = new Date(position.moment);
    return validHours.includes(moment.getHours()) && position.wind_speed;
  }).reduce<{ t: Date, y: number }[]>((result, current, index) => {
    const moment = new Date(current.moment);
    const windSpeed = current.wind_speed ** 2;

    if (index === 0) {
      return [{ t: moment, y: windSpeed }];
    }

    const previous = result[index - 1];
    return result.concat({ t: moment, y: previous.y + windSpeed });
  }, []).map(item => ({ ...item, y: item.y / 10e3 }));

  const pressureData = {
    datasets: [
      {
        label: 'Pressure',
        borderColor: '#5ebfff', // BLUE
        data: pressures,
      },
    ]
  };

  const windSpeedData = {
    datasets: [
      {
        label: 'Wind Speed',
        borderColor: '#ff0000', // RED
        data: windSpeeds,
      },
    ]
  };

  const speedData = {
    datasets: [
      {
        label: 'Speed',
        borderColor: '#fc8f00', // ORANGE
        data: speeds,
      },
    ]
  };

  const pressureAndWindSpeed = {
    datasets: [
      {
        yAxisID: 'pressure',
        label: 'Pressure',
        borderColor: '#5ebfff', // BLUE
        data: pressures,
      },
      {
        yAxisID: 'wind_speed',
        label: 'Wind Speed',
        borderColor: '#ff0000', // RED
        data: windSpeeds,
      },
    ]
  }

  const aceData = {
    datasets: [
      {
        label: 'Accumulated Cyclone Energy',
        borderColor: '#5ebfff', // BLUE
        data: ace,
      },
    ]
  }

  const tabs = [
    { menuItem: 'Pressure', render: () => <Line key="pressure" data={pressureData} options={options} /> },
    { menuItem: 'Wind Speed', render: () => <Line key="wind_speed" data={windSpeedData} options={options} /> },
    { menuItem: 'Pressure AND Wind Speed', render: () => (
      <Line key="pressure_windspeed" data={pressureAndWindSpeed} options={optionsForPressureAndWS} />
    )},
    { menuItem: 'Speed', render: () => <Line key="speed" data={speedData} options={options} /> },
    { menuItem: 'ACE', render: () => <Line key="ace" data={aceData} options={options} /> },
  ];

  return (
    <>
      <Button color="blue" icon="chart bar" content="Charts" onClick={toggleModal} />
      <Modal open={modalOpen} onClose={toggleModal} size="small" closeIcon>
        <Modal.Header>{ hurricane.name }'s charts</Modal.Header>
        <Modal.Content>
          <Tab panes={tabs} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" content="Close" onClick={toggleModal} />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default HurricaneCharts;
