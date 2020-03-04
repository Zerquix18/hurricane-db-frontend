import React, { useState } from 'react';
import { Hurricane } from 'models';
import { Button, Modal, Message, Tab } from 'semantic-ui-react';

interface HurricaneChartsProps {
  hurricane: Hurricane;
}

const HurricaneCharts: React.FC<HurricaneChartsProps> = ({ hurricane }) => {
  const [modalOpen, changeModalOpen] = useState<boolean>(false);
  const toggleModal = () => {
    changeModalOpen(! modalOpen);
  };

  const pressureData = (hurricane.positions || []).filter(position => {
    return !! position.pressure;
  }).map(position => {
    const { moment, pressure } = position;
    return { moment, pressure };
  });

  const windSpeedData = (hurricane.positions || []).filter(position => {
    return !! position.wind_speed;
  }).map(position => {
    const { moment, wind_speed } = position;
    return { moment, wind_speed };
  });

  const tabs = [];

  if (pressureData.length > 0) {
    tabs.push({ menuItem: 'Pressure in time', render: () => 'I will render the pressure in time' });
  }
  if (windSpeedData.length > 0) {
    tabs.push({ menuItem: 'Wind Speed in time', render: () => 'I will render the wind speed in time' });
  }

  return (
    <>
      <Button color="blue" icon="chart bar" content="Charts" onClick={toggleModal} />
      <Modal open={modalOpen} onClose={toggleModal} size="small" closeIcon>
        <Modal.Header>{ hurricane.name }'s charts</Modal.Header>
        <Modal.Content>
          { tabs.length === 0 && (
            <Message color="yellow">
              <Message.Header>No charts to display.</Message.Header>
              <Message.Content>
                Sorry, we don't have enough data for this hurricane.
              </Message.Content>
            </Message>
          )}
          { tabs.length > 0 && (
            <Tab panes={tabs} />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" content="Close" onClick={toggleModal} />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default HurricaneCharts;
