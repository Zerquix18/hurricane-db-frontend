import React from 'react';
import { AppModeSearch } from 'models';
import { Message, List, Image, Button } from 'semantic-ui-react';
import { getHurricaneName } from 'utils';
import { useHistory } from 'react-router';
import format from 'date-fns/format';

interface SearchResultsProps {
  searchMode: AppModeSearch;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchMode }) => {
  const history = useHistory();

  return (
    <div style={{ marginTop: 10 }}>
      { searchMode.results.length === 0 && (
        <Message color="yellow">
          <Message.Header>No results.</Message.Header>
          <Message.Content>
            Your search had no results.
          </Message.Content>
        </Message>
      )}

      { searchMode.results.length > 0 && (
        <List>
          { searchMode.results.map((system, index) => {
            const onView = () => {
              history.push(`/${system.basin}/${system.season}/${system.name.toLowerCase()}`);
            };
            const formed = format(new Date(system.formed), 'MMMM d');
            const dissipated = system.dissipated ? format(new Date(system.dissipated), 'MMMM d') : 'Present';
            return (
              <List.Item key={system.id}>
                <Image avatar src={system.image_url} />
                <List.Content>
                  <List.Header># {index + 1} { getHurricaneName(system) } ({ system.season })</List.Header>
                  <List.Description>
                    { formed } - { dissipated }
                  </List.Description>
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

export default SearchResults;
