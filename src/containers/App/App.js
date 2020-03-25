import React from 'react';
import "semantic-ui-css/semantic.min.css";
import './App.css';
import Navmenu from '../../components/Navmenu';
import Leftnav from '../../components/Leftnav';
import { Grid } from 'semantic-ui-react';
import Routes from '../../Routes/Routes';

function App() {
  return (
    <div className="App">
      <Navmenu />
      <Grid padded>
          <Leftnav />
          <Grid.Column
            mobile={16}
            tablet={13}
            computer={13}
            floated="right"
            id="content"
          >
            <Routes />
          </Grid.Column>
      </Grid>
      
    </div>
  );
};

export default App;
