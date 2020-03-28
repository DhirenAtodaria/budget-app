import React, { Component } from 'react';
import { globalHistory } from '@reach/router';
import './Leftnav.css'
import "semantic-ui-css/semantic.min.css";

import {Grid, Menu, Divider} from 'semantic-ui-react'

export default class Leftnav extends Component {

  state = {activeItem : "dashboard"}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name }, this.navigate(name))
  }

  navigate = (name) => {
    globalHistory.navigate(`/${name}`)
  }

  render() {
    const activeItem = this.state.activeItem
      return(
      <Grid.Column
          tablet={3}
          computer={3}
          only="tablet computer"
          id="sidebar"
      >
          <Menu vertical borderless fluid text>
            <Menu.Item  name="dashboard" active={activeItem === 'dashboard'} onClick={this.handleItemClick} as="a">
              Overview
            </Menu.Item>
            <Divider hidden />
            <Menu.Item name="daily" active={activeItem === 'daily'} onClick={this.handleItemClick} as="a">Daily Spendings</Menu.Item>
            <Menu.Item name="monthly" active={activeItem === 'monthly'} onClick={this.handleItemClick} as="a">Monthly Spendings</Menu.Item>
            <Menu.Item name="yearly" active={activeItem === 'yearly'} onClick={this.handleItemClick} as="a">Yearly Spendings</Menu.Item>
            <Divider hidden />
          </Menu>
      </Grid.Column>
      )
  }
}