import React, { useState } from 'react';
import { Hurricane } from 'models';
import { Button, Modal } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import chartOptions from './chartOptions';
import { useSettings } from 'hooks';
import translateUnit from 'utils/translateUnit';

interface HurricaneChartsProps {
  hurricane: Hurricane;
}

const options = {
  scales: {
    xAxes: [{
      type: 'time'
    }]
  }
};

const HurricaneCharts: React.FC<HurricaneChartsProps> = ({ hurricane }) => {
  const [modalOpen, changeModalOpen] = useState<boolean>(false);
  const settings = useSettings();

  const toggleModal = () => {
    changeModalOpen(! modalOpen);
  };

  const pressureData = (hurricane.positions || [])
                       .filter(({ pressure }) => !! pressure)
                       .map(({ moment, pressure }) => ({
                          t: new Date(moment),
                          y: translateUnit({ type: 'pressure', to: settings.units.pressure, value: pressure })
                        }))

  const windSpeedData = (hurricane.positions || [])
                        .filter(({ wind_speed }) => !! wind_speed)
                        .map(({ moment, wind_speed }) => ({
                          t: new Date(moment),
                          y: translateUnit({ type: 'speed', to: settings.units.speed, value: wind_speed }),
                        }))

  const data = chartOptions(pressureData, windSpeedData);

  return (
    <>
      <Button color="blue" icon="chart bar" content="Charts" onClick={toggleModal} />
      <Modal open={modalOpen} onClose={toggleModal} size="small" closeIcon>
        <Modal.Header>{ hurricane.name }'s chart</Modal.Header>
        <Modal.Content>
          <Line data={data} options={options} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" content="Close" onClick={toggleModal} />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default HurricaneCharts;
