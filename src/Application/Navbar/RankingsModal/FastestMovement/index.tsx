import React, { useState, useEffect } from 'react';
import { fetchRanking } from 'api';
import { Hurricane } from 'models';
import { Loader, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance'

interface FastestMovement {
  onClose: () => void;
}

interface HurricaneMovement {
  hurricane: Hurricane;
  speed: number;
  total_distance: number;
  total_time: number;
}

const FastestMovement: React.FC<FastestMovement> = ({ onClose }) => {
  const [hurricanes, setHurricanes] = useState<HurricaneMovement[]>([]);
  const [loading, setLoading] = useState(true);

  const getHurricanes = async () => {
    try {
      const hurricanes = await fetchRanking('top_by_fastest_movement');
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


  return (
    <>
      <p>Fastest movement across land from start to end</p>
      <Table>
        <Table.Header>
          <Table.HeaderCell>System</Table.HeaderCell>
          <Table.HeaderCell>Year</Table.HeaderCell>
          <Table.HeaderCell>Distance traveled</Table.HeaderCell>
          <Table.HeaderCell>Travel time</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { hurricanes.map(hurricane => {
            const to = `/${hurricane.hurricane.basin}/${hurricane.hurricane.season}/${hurricane.hurricane.name.toLowerCase()}`;
            console.log(hurricane.hurricane.formed, hurricane.hurricane.dissipated);
            return (
              <Table.Row key={hurricane.hurricane.id}>
                <Table.Cell><Link to={to} onClick={onClose}>{ hurricane.hurricane.name }</Link></Table.Cell>
                <Table.Cell>{ hurricane.hurricane.season }</Table.Cell>
                <Table.Cell>{ Math.round(hurricane.total_distance) } meters</Table.Cell>
                <Table.Cell>
                  { formatDistance(
                    new Date(hurricane.hurricane.formed),
                    new Date(hurricane.hurricane.dissipated),
                    { includeSeconds: true }
                  ) }
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}

export default FastestMovement;
