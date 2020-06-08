import React, { useState, useEffect } from 'react';
import { fetchRanking } from 'api';
import { Loader, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface SeasonsProps {
  onClose: () => void;
}

interface Season {
  season: number;
  total: number;
}

const Seasons: React.FC<SeasonsProps> = ({ onClose }) => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);

  const getSeasons = async () => {
    try {
      const seasons = await fetchRanking('top_by_season');
      setSeasons(seasons);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSeasons();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    (
      <Table>
        <Table.Header>
          <Table.HeaderCell>Season</Table.HeaderCell>
          <Table.HeaderCell>Total systems</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { seasons.map(season => {
            const to = `/atlantic/${season.season}`;
            return (
              <Table.Row key={season.season}>
                <Table.Cell><Link to={to} onClick={onClose}>{ season.season }</Link></Table.Cell>
                <Table.Cell>{ season.total }</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  );
}

export default Seasons;
