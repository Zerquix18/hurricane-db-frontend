import React, { useState, useEffect } from 'react';
import { fetchRanking } from 'api';
import { Hurricane } from 'models';
import { Loader, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSettings } from 'hooks';
import { translateUnit } from 'utils';

interface HighestWindSpeedProps {
  onClose: () => void;
}

const HighestWindSpeed: React.FC<HighestWindSpeedProps> = ({ onClose }) => {
  const [hurricanes, setHurricanes] = useState<Hurricane[]>([]);
  const [loading, setLoading] = useState(true);
  const settings = useSettings();

  const getHurricanes = async () => {
    try {
      const hurricanes = await fetchRanking('top_by_highest_windspeed');
      setHurricanes(hurricanes);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHurricanes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log(loading);

  return (
    (
      <Table>
        <Table.Header>
          <Table.HeaderCell>System</Table.HeaderCell>
          <Table.HeaderCell>Year</Table.HeaderCell>
          <Table.HeaderCell>max speed ({ settings.units.speed })</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { hurricanes.map(hurricane => {
            const to = `/${hurricane.basin}/${hurricane.season}/${hurricane.name.toLowerCase()}`;
            return (
              <Table.Row key={hurricane.id}>
                <Table.Cell><Link to={to} onClick={onClose}>{ hurricane.name }</Link></Table.Cell>
                <Table.Cell>{ hurricane.season }</Table.Cell>
                <Table.Cell>
                  { translateUnit({ type: 'speed', to: settings.units.speed, value:  hurricane.highest_windspeed! }) }
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  );
}

export default HighestWindSpeed;
