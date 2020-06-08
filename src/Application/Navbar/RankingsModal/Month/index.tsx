import React, { useState, useEffect } from 'react';
import { fetchRanking } from 'api';
import { Hurricane } from 'models';
import { Loader, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

interface MonthProps {
  onClose: () => void;
}

interface HurricaneWithMaxSpeed extends Hurricane {
  max_speed: number;
}

const Month: React.FC<MonthProps> = ({ onClose }) => {
  const [hurricanes, setHurricanes] = useState<HurricaneWithMaxSpeed[]>([]);
  const [loading, setLoading] = useState(true);

  const getHurricanes = async () => {
    try {
      const hurricanes = await fetchRanking('top_by_month');
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
          <Table.HeaderCell>Month</Table.HeaderCell>
          <Table.HeaderCell>Max Speed (kt)</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { hurricanes.map(hurricane => {
            const to = `/${hurricane.basin}/${hurricane.season}/${hurricane.name.toLowerCase()}`;
            return (
              <Table.Row key={hurricane.id}>
                <Table.Cell><Link to={to} onClick={onClose}>{ hurricane.name }</Link></Table.Cell>
                <Table.Cell>{ hurricane.season }</Table.Cell>
                <Table.Cell>
                  { format(new Date(hurricane.formed), 'MMMM') }
                </Table.Cell>
                <Table.Cell>
                  { hurricane.max_speed }
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  );
}

export default Month;
