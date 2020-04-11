import React, { useState } from 'react';
import { Modal, List, Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';

interface SeasonModalProps {
  onClose: () => void;
}

const currentYear = new Date().getFullYear();
const seasons = new Array(currentYear - 1851).fill(0).map((_, i) => currentYear - i);

const SeasonModal: React.FC<SeasonModalProps> = ({ onClose }) => {
  const [filter, setFilter] = useState('');
  const history = useHistory();

  const seasonsToDisplay = seasons.filter(season => {
    const currentFilter = filter.trim();
    if (currentFilter.length === 0) {
      return true;
    }
    const seasonString = String(season);
    return seasonString.includes(currentFilter);
  }).slice(0, 10);

  return (
    <Modal open closeIcon size="small" onClose={onClose}>
      <Modal.Header>Seasons</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            title="Find season"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </Form>
        <List divided relaxed>
          { seasonsToDisplay.map(season => {
            const onClick = () => {
              history.push(`/atlantic/${season}`);
            };
            return (
              <List.Item key={season}>
                { season }
                <List.Content floated="right">
                  <Button color="blue" size="mini" onClick={onClick}>
                    View season
                  </Button>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Modal.Content>
    </Modal>
  );
};

export default SeasonModal;
