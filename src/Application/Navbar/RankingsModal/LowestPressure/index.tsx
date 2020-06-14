import React, { useState, useEffect } from 'react';
import { fetchRanking } from 'api';
import { Hurricane } from 'models';
import { Loader, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSettings } from 'hooks';
import { translateUnit } from 'utils';

interface LowestPressureProps {
  onClose: () => void;
}

interface HurricaneWithMinPressure extends Hurricane {
  min_pressure: number;
}

const LowestPressure: React.FC<LowestPressureProps> = ({ onClose }) => {
  const [hurricanes, setHurricanes] = useState<HurricaneWithMinPressure[]>([]);
  const [loading, setLoading] = useState(true);
  const settings = useSettings();

  const getHurricanes = async () => {
    try {
      const hurricaness = await fetchRanking('top_by_lowest_pressure');
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

  return (
    (
      <Table>
        <Table.Header>
          <Table.HeaderCell>System</Table.HeaderCell>
          <Table.HeaderCell>Year</Table.HeaderCell>
          <Table.HeaderCell>Minimum Pressure ({ settings.units.pressure })</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { hurricanes.map(hurricane => {
            const to = `/${hurricane.basin}/${hurricane.season}/${hurricane.name.toLowerCase()}`;
            return (
              <Table.Row key={hurricane.id}>
                <Table.Cell><Link to={to} onClick={onClose}>{ hurricane.name }</Link></Table.Cell>
                <Table.Cell>{ hurricane.season }</Table.Cell>
                <Table.Cell>
                  { translateUnit({ type: 'pressure', to: settings.units.pressure, value: hurricane.min_pressure }).toFixed(2) }
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  );
}

export default LowestPressure;
