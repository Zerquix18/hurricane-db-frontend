import React, { useState, useEffect } from 'react';
import { fetchRanking } from 'api';
import { Hurricane } from 'models';
import { Loader, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface LowestPressureProps {
  onClose: () => void;
}

interface HurricaneWithMinPressure extends Hurricane {
  min_pressure: number;
}

const LowestPressure: React.FC<LowestPressureProps> = ({ onClose }) => {
  const [hurricanes, setHurricanes] = useState<HurricaneWithMinPressure[]>([]);
  const [loading, setLoading] = useState(true);

  const getHurricanes = async () => {
    try {
      console.log('...');
      const hurricaness = await fetchRanking('top_by_lowest_pressure');
      console.log(hurricaness);
      setHurricanes(hurricaness);
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
          <Table.HeaderCell>Minimum Pressure (mb)</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { hurricanes.map(hurricane => {
            const to = `/${hurricane.basin}/${hurricane.season}/${hurricane.name.toLowerCase()}`;
            return (
              <Table.Row key={hurricane.id}>
                <Table.Cell><Link to={to} onClick={onClose}>{ hurricane.name }</Link></Table.Cell>
                <Table.Cell>{ hurricane.season }</Table.Cell>
                <Table.Cell>{ hurricane.min_pressure }</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  );
}

export default LowestPressure;
