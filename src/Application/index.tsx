import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useRouteMatch, useHistory } from 'react-router';
import { AppStateProvider } from 'providers';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MapArea from './MapArea';
import { fetchHurricane } from 'api';

const Application: React.FC = () => {
  const hurricaneMode = useRouteMatch({ path: '/:basin/:season/:name', strict: true });
  const seasonMode = useRouteMatch({ path: '/:basin/:year', strict: true });
  const rankingMode = useRouteMatch({ path: '/ranking/:ranking', strict: true, });
  const searchMode = useRouteMatch({ path: '/search', strict: true });
  const history = useHistory();

  const setMode = () => {
    if (hurricaneMode) {
      const { basin, season, name } = hurricaneMode.params as any; // how come you have {} 
      fetchHurricane(basin, season, name).then(console.log).catch(console.log);
      return;
    }

    // no mode detected
    history.push('/atlantic/2017/maria');
  };
  
  useEffect(setMode, [hurricaneMode, seasonMode, rankingMode, searchMode]);

  return (
    <AppStateProvider>
      <Navbar />
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        <Grid>
          <Grid.Column computer={3}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column computer={12}>
          <MapArea />
          </Grid.Column>
        </Grid>
      </div>
    </AppStateProvider>
  );
};

export default Application;
