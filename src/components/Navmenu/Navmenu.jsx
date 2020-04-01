import React, { Component } from 'react';
import "semantic-ui-css/semantic.min.css";
import { globalHistory } from '@reach/router'
import {Grid, Menu, Input, Divider, Button, Icon} from "semantic-ui-react";

class Navmenu extends Component {
    state = {
        dropdownMenuStyle: {
          display: "none"
        }
      };
    
      handleToggleDropdownMenu = () => {
        let newState = Object.assign({}, this.state);
        if (newState.dropdownMenuStyle.display === "none") {
          newState.dropdownMenuStyle = { display: "flex" };
        } else {
          newState.dropdownMenuStyle = { display: "none" };
        }
    
        this.setState(newState);
      };

      handleItemClick = (e, { name }) => {
        globalHistory.navigate(`${name}`)
      }

    render() {
        return (
            <>
            <Grid padded className="tablet computer only">
                <Menu borderless inverted fluid fixed="top">
                    <Menu.Item header as="a">
                        Oznom - Budget Your Spending.
                    </Menu.Item>
                    <Menu.Item>{Date()}</Menu.Item>
                    <Menu.Menu position="right">
                    <Menu.Item>
                        <Input placeholder="Search..." size="small" />
                    </Menu.Item>
                        <Menu.Item name="dashboard" onClick={this.handleItemClick} as="a">Dashboard</Menu.Item>
                        <Menu.Item name="about" onClick={this.handleItemClick} as="a">About/Help</Menu.Item>
                        <Menu.Item as="a" onClick={this.props.signOut}>Logout</Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Grid>
            <Grid padded className="mobile only">
            <Menu borderless inverted fluid fixed="top">
              <Menu.Item header as="a">
                Oznom
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item name="dashboard" onClick={this.handleItemClick} as="a">Dashboard</Menu.Item>
                <Menu.Item name="about" onClick={this.handleItemClick} as="a">About/Help</Menu.Item>
                <Menu.Item>
                  <Button
                    basic
                    inverted
                    icon
                    toggle
                    onClick={this.handleToggleDropdownMenu}
                  >
                    <Icon name="content" />
                  </Button>
                </Menu.Item>
              </Menu.Menu>
              <Menu
                borderless
                fluid
                inverted
                vertical
                style={this.state.dropdownMenuStyle}
              >
                    <Menu.Item name="daily" onClick={this.handleItemClick} as="a">Daily</Menu.Item>
                    <Menu.Item name="monthly" onClick={this.handleItemClick} as="a">Monthly</Menu.Item>
                    <Menu.Item name="yearly" onClick={this.handleItemClick} as="a">Yearly</Menu.Item>
                    <Menu.Item as="a" onClick={this.props.signOut}>Logout</Menu.Item>
                    <Divider fitted />
                <Menu.Item>
                  <Input placeholder="Search..." size="small" />
                </Menu.Item>
              </Menu>
            </Menu>
          </Grid>
          </>
        )
    }
}

export default Navmenu;