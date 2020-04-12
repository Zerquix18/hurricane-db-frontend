import React from 'react';
import { AppModeSeason } from 'models';
import { Dimmer, Loader, Header } from 'semantic-ui-react';
import { translateBasin, formatNumber } from 'utils';
import { format } from 'date-fns';

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
  
  return (
    <>
      <Header as="h2">{ season.year } { translateBasin(season.basin) } hurricane season</Header>

      <Header as="h3">Boundaries:</Header>

      <p>
        <strong>First system formed on: </strong>
        { format(new Date(season.boundaries.first_system_formed_on), 'MMMM d, yyyy, HH:kk') }
      </p>
      <p>
        <strong>Last system dissipated on: </strong>
        { format(new Date(season.boundaries.last_system_dissipated_on), 'MMMM d, yyyy, HH:kk') }
      </p>

      <Header as="h3">Statistics:</Header>

      <p>
        <strong>Total systems: </strong>
        { season.statistics.total_systems }
      </p>

      <p>
        <strong>Total stors: </strong>
        { season.statistics.total_storms }
      </p>

      <p>
        <strong>Total hurricanes: </strong>
        { season.statistics.total_hurriccanes }
      </p>

      <p>
        <strong>Total major hurricanes: </strong>
        { season.statistics.total_major_hurricanes }
      </p>

      <p>
        <strong>Total damage: </strong>
        { formatNumber(season.statistics.total_damage) }
      </p>

      <p>
        <strong>Total fatalities: </strong>
        { formatNumber(season.statistics.total_fatalities) }
      </p>

      <Header as="h3">Strongest storm:</Header>

      <p>
        <strong>Name: </strong>
        { season.strongest_storm.name }
      </p>

    </>
  );
}

export default SeasonSidebar;
