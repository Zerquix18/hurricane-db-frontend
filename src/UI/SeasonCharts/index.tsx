import React, { useState } from 'react';
import { Season, HurricanePosition } from 'models';
import { Modal, Button, Tab } from 'semantic-ui-react';
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
  const systemsFormedByMonth = [...new Array(months.length)].map((_, month) => {
    const systems = season.systems.filter(system => new Date(system.formed).getMonth() === month);
    return systems.length;
  });
  const systemsDissipatedByMonth = [...new Array(months.length)].map((_, month) => {
    const systems = season.systems.filter(system => new Date(system.dissipated).getMonth() === month);
    return systems.length;
  });

  const allPositions = season.systems.filter(system => !! system.positions)
                                     .map(system => system.positions).flat() as HurricanePosition[];

  const aceByMonth = [...new Array(months.length)].map((_, month) => {
    const positions = allPositions.filter(position => {
      const moment = new Date(position.moment);
      const positionMonth = moment.getMonth();
      return month === positionMonth;
    });

    const ace = positions.filter(position => {
      const validHours = [0, 6, 12, 18];
      const moment = new Date(position.moment);
      return validHours.includes(moment.getHours()) && position.wind_speed;
    }).reduce((ace, current, index) => {
      const windSpeed = current.wind_speed ** 2;
  
      return index === 0 ? windSpeed : ace + windSpeed;
    }, 0) / 10e3;

    return ace;
  });

  const dataForFormations = {
    labels: months,
    datasets: [
      {
        label: 'Systems formed by month',
        data: systemsFormedByMonth,
        backgroundColor: '#ff0000'
      },
      {
        label: 'Systems dissipated by month',
        data: systemsDissipatedByMonth,
        backgroundColor: '#fc8f00'
      },
    ]
  };

  const dataForAce = {
    labels: months,
    datasets: [
      {
        label: 'Accumulated Cyclone Energy',
        data: aceByMonth,
        backgroundColor: '#fc8f00'
      },
    ]
  };

  const tabs = [
    { menuItem: 'Formations/Dissipations by month', render: () => <Bar key="formations" data={dataForFormations} /> },
    { menuItem: 'ACE', render: () => <Bar key="ace" data={dataForAce} /> },
  ];

  return (
    <>
      <Button color="blue" icon="chart bar" content="Charts" onClick={toggleModal} />
      <Modal open={modalOpen} onClose={toggleModal} size="small" closeIcon>
        <Modal.Header>{ season.year } { translateBasin(season.basin) } hurricane season charts</Modal.Header>
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

export default SeasonCharts;
