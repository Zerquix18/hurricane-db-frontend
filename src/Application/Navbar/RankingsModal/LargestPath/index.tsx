import React, { useState, useEffect } from 'react';
import { fetchRanking } from 'api';
import { Hurricane } from 'models';
import { Loader, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface LargestPathProps {
  onClose: () => void;
}

interface HurricaneAndDistance {
  hurricane: Hurricane;
  total_distance: number;
}

const LargestPath: React.FC<LargestPathProps> = ({ onClose }) => {
  const [hurricanes, setHurricanes] = useState<HurricaneAndDistance[]>([]);
  const [loading, setLoading] = useState(true);

  const getHurricanes = async () => {
    try {
      const hurricanes = await fetchRanking('top_by_largest_path');
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
    (
      <Table>
        <Table.Header>
          <Table.HeaderCell>System</Table.HeaderCell>
          <Table.HeaderCell>Year</Table.HeaderCell>
          <Table.HeaderCell>Distance traveled</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { hurricanes.map(hurricane => {
            const to = `/${hurricane.hurricane.basin}/${hurricane.hurricane.season}/${hurricane.hurricane.name.toLowerCase()}`;
            return (
              <Table.Row key={hurricane.hurricane.id}>
                <Table.Cell><Link to={to} onClick={onClose}>{ hurricane.hurricane.name }</Link></Table.Cell>
                <Table.Cell>{ hurricane.hurricane.season }</Table.Cell>
                <Table.Cell>{ hurricane.total_distance }</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  );
}

export default LargestPath;
