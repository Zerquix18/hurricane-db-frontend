import React, { useState, useEffect } from 'react';
import { fetchRanking } from 'api';
import { Hurricane } from 'models';
import { Loader, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatNumber } from 'utils';

interface FatalitiesProps {

}

const Fatalities: React.FC<FatalitiesProps> = () => {
  const [hurricanes, setHurricanes] = useState<Hurricane[]>([]);
  const [loading, setLoading] = useState(true);

  const getHurricanes = async () => {
    try {
      const hurricanes = await fetchRanking('top_by_fatalities');
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
          <Table.HeaderCell>Fatalities</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { hurricanes.map(hurricane => {
            const to = `/${hurricane.basin}/${hurricane.season}/${hurricane.name.toLowerCase()}`;
            return (
              <Table.Row key={hurricane.id}>
                <Table.Cell><Link to={to}>{ hurricane.name }</Link></Table.Cell>
                <Table.Cell>{ hurricane.season }</Table.Cell>
                <Table.Cell>
                  { hurricane.min_range_fatalities === hurricane.max_range_fatalities ?
                    formatNumber(hurricane.min_range_fatalities!)
                  :
                    `${formatNumber(hurricane.min_range_fatalities!)} - ${formatNumber(hurricane.max_range_fatalities!)}`
                  }
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  );
}

export default Fatalities;
