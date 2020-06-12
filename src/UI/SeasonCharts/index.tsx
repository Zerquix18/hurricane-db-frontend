import React, { useState } from 'react';
import { Season } from 'models';
import { Modal, Button } from 'semantic-ui-react';
import { translateBasin } from 'utils';
import { Bar } from 'react-chartjs-2';

interface SeasonChartsProps {
  season: Season;
}

const SeasonCharts: React.FC<SeasonChartsProps> = ({ season }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(modalOpen => ! modalOpen);
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const systemsByMonth = [...new Array(months.length)].map((_, month) => {
    const systems = season.systems.filter(system => new Date(system.formed).getMonth() === month);
    return systems.length;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Hurricanes by month',
        data: systemsByMonth,
      },
    ]
  };

  return (
    <>
      <Button color="blue" icon="chart bar" content="Charts" onClick={toggleModal} />
      <Modal open={modalOpen} onClose={toggleModal} size="small" closeIcon>
        <Modal.Header>{ season.year } { translateBasin(season.basin) } hurricane season charts</Modal.Header>
        <Modal.Content>
          <Bar data={data} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" content="Close" onClick={toggleModal} />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default SeasonCharts;
