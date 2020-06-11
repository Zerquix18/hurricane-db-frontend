import React from 'react';
import { AppModeSeason } from 'models';
import { Dimmer, Loader, Header, Tab } from 'semantic-ui-react';
import { translateBasin } from 'utils';
import SeasonInfo from './SeasonInfo';
import SeasonHurricanes from './SeasonHurricanes';

interface SeasonSidebar {
  seasonMode: AppModeSeason;
}

const SeasonSidebar: React.FC<SeasonSidebar> = ({ seasonMode }) => {
  if (seasonMode.loading || ! seasonMode.season) {
    return (
      <Dimmer active>
        <Loader content="Loading season info..." />
      </Dimmer>
    );
  }
  
  const { season } = seasonMode;

  const panes = [
    { menuItem: 'Season Info', render: () => <SeasonInfo season={season} /> },
    { menuItem: 'Systems', render: () => <SeasonHurricanes season={season} /> },
  ];

  return (
    <>
      <Header as="h2">{ season.year } { translateBasin(season.basin) } hurricane season</Header>

      <Tab panes={panes} />
    </>
  );
}

export default SeasonSidebar;
