import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useRouteMatch, useHistory, useLocation } from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MapArea from './MapArea';
import { fetchHurricane, fetchSeason, fetchSearch } from 'api';
import { useMode } from 'hooks';

const Application: React.FC = () => {
  const hurricaneMode = useRouteMatch({ path: '/:basin/:season/:name', strict: true });
  const seasonMode = useRouteMatch({ path: '/:basin/:year', strict: true });
  const searchMode = useRouteMatch({ path: '/search', strict: true });
  const location = useLocation();
  const history = useHistory();
  const mode = useMode();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const setMode = () => {
    if (hurricaneMode) {
      const { basin, season, name } = hurricaneMode.params as { basin: string, season: number, name: string };
      mode.setHurricaneMode();
      fetchHurricane(basin, season, name).then(mode.setHurricane).catch(console.log);
      return;
    }

    if (seasonMode) {
      const { basin, year } = seasonMode.params as any;
      mode.setSeasonMode();
      fetchSeason(basin, year).then(mode.setSeason).catch(console.log);
      return;
    }

    if (searchMode) {
      mode.setSearchMode();
      fetchSearch(location.search).then(mode.setSearch).catch(console.log);
      return;
    }

    // no mode detected
    history.push('/atlantic/2017/maria');
  };
  
  // I know. I'm an awful human being.
  const listeners = [
    hurricaneMode ? JSON.stringify(hurricaneMode.params) : null,
    seasonMode ? JSON.stringify(seasonMode.params) : null,
    searchMode ? location.search : null,
  ];

  useEffect(setMode, listeners);

  return (
    <div>
      <Navbar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        <Grid>
          <Grid.Column computer={4} only="computer" mobile={mobileSidebarOpen ? 16 : undefined}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column computer={12} mobile={16} tablet={16}>
            <MapArea />
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default Application;
