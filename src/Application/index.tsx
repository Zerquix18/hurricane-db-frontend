import React from 'react';
import { Grid } from 'semantic-ui-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MapArea from './MapArea';
import { AppStateProvider } from 'providers';

const Application: React.FC = () => {
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
