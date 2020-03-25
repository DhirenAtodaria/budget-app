import React, { Component } from 'react';
import styles from './Navmenu.module.scss'
import "semantic-ui-css/semantic.min.css";

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
                        <Menu.Item as="a">Dashboard</Menu.Item>
                        <Menu.Item as="a">About</Menu.Item>
                        <Menu.Item as="a">Help</Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Grid>
            <Grid padded className="mobile only">
            <Menu borderless inverted fluid fixed="top">
              <Menu.Item header as="a">
                Oznom - Budget Your Spending.
              </Menu.Item>
              <Menu.Menu position="right">
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
                    <Menu.Item as="a">Dashboard</Menu.Item>
                    <Menu.Item as="a">About</Menu.Item>
                    <Menu.Item as="a">Help</Menu.Item>
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