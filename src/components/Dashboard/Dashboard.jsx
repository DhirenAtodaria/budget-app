import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import StatisticsPage from "../StatisticsPage";

import {
  Grid,
  Header
} from "semantic-ui-react";


import "./Dashboard.css";



class Dashboard extends Component {
  monthGetter() {
    const options = { month: 'long'};
    const cDate = new Date()
    const previousDate = new Date(cDate.getFullYear(), cDate.getMonth()-1, 1)
    const month = previousDate.toLocaleString('default', options);
    return month
  }

  render() {
    return (
      <>
        <Grid padded>
          <Grid.Row>
            <Header dividing size="huge" as="h1">
              Dashboard
              <Header style={{opacity : 0.7, margin: "10px 0px", width: "100%"}}  as='h2'>Spending Trends - {this.monthGetter()}</Header>
            </Header>
          </Grid.Row>
          <Grid.Row>
            <StatisticsPage />
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default Dashboard;
