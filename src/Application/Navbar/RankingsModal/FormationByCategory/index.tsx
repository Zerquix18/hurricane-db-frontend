import React, { useState, useEffect } from 'react';
import { fetchRanking } from 'api';
import { Hurricane } from 'models';
import { Loader, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

interface FormationByCategoryProps {
  type: 'earliest' | 'latest';
}

interface HurricaneAndCategory {
  type: 'tropical_storm' | 'category_1' | 'category_2' | 'category_3' | 'category_4' | 'category_5'
  storm: Hurricane;
  reached_at: string;
}

const categories = {
  tropical_storm: 'Tropical Storm',
  category_1: 'Category 1',
  category_2: 'Category 2',
  category_3: 'Category 3',
  category_4: 'Category 4',
  category_5: 'Category 5',
};

const FormationByCategory: React.FC<FormationByCategoryProps> = ({ type }) => {
  const [hurricanes, setHurricanes] = useState<HurricaneAndCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const getHurricanes = async () => {
    try {
      const url = type === 'earliest' ? 'earliest_formation_by_category' : 'latest_formation_by_category';
      const hurricaness = await fetchRanking(url);
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
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>System</Table.HeaderCell>
          <Table.HeaderCell>Year</Table.HeaderCell>
          <Table.HeaderCell>Formed</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          
          { hurricanes.map(hurricane => {
            const to = `/${hurricane.storm.basin}/${hurricane.storm.season}/${hurricane.storm.name.toLowerCase()}`;
            return (
              <Table.Row key={hurricane.storm.id}>
                <Table.Cell>{ categories[hurricane.type] }</Table.Cell>
                <Table.Cell><Link to={to}>{ hurricane.storm.name }</Link></Table.Cell>
                <Table.Cell>{ hurricane.storm.season }</Table.Cell>
                <Table.Cell>{ format(new Date(hurricane.reached_at), 'MMMM L, yyyy') }</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  );
}

export default FormationByCategory;
