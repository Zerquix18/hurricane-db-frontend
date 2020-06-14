import React, { useState } from 'react';
import { Hurricane } from 'models';
import { Button, Modal, Tab } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { useSettings } from 'hooks';
import translateUnit from 'utils/translateUnit';

interface HurricaneChartsProps {
  hurricane: Hurricane;
}

const options = {
  scales: {
    xAxes: [{ type: 'time' }]
  }
};

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
        borderColor: '#ff0000', // BLUE
        data: windSpeeds,
      },
    ]
  };

  const tabs = [
    { menuItem: 'Pressure', render: () => <Line key="pressure" data={pressureData} options={options} /> },
    { menuItem: 'Wind Speed', render: () => <Line key="wind_speed" data={windSpeedData} options={options} /> },
  ];

  return (
    <>
      <Button color="blue" icon="chart bar" content="Charts" onClick={toggleModal} />
      <Modal open={modalOpen} onClose={toggleModal} size="small" closeIcon>
        <Modal.Header>{ hurricane.name }'s chart</Modal.Header>
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
