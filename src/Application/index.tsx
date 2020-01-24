import React from 'react';
import { Grid } from 'semantic-ui-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Application: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        <Grid>
          <Grid.Column computer={3}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column computer={12}>
            COLUMN 2
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default Application;
