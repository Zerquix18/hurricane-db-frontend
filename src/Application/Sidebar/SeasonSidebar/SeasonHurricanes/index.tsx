import React from 'react';
import { Season } from 'models';
import { Message, List, Image, Button } from 'semantic-ui-react';
import { getHurricaneName } from 'utils';
import { useHistory } from 'react-router';

interface SeasonHurricanesProps {
  season: Season;
}

const SeasonHurricanes: React.FC<SeasonHurricanesProps> = ({ season }) => {
  const history = useHistory();

  return (
    <div style={{ marginTop: 10 }}>
      { season.systems.length === 0 && (
        <Message color="yellow">
          <Message.Header>No systems</Message.Header>
          <Message.Content>
            This season had no systems.
          </Message.Content>
        </Message>
      )}

      { season.systems.length > 0 && (
        <List>
          { season.systems.map((system, index) => {
            const onView = () => {
              history.push(`/${season.basin}/${season.year}/${system.name.toLowerCase()}`);
            };
            return (
              <List.Item key={system.id}>
                <Image avatar src={system.image_url} />
                <List.Content>
                  <List.Header># {index + 1} { getHurricaneName(system) }</List.Header>
                </List.Content>
                <List.Content floated="right">
                  <Button size="tiny" color="blue" onClick={onView}>
                    View
                  </Button>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      )}
    </div>
  );
}

export default SeasonHurricanes;
