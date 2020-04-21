import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "./Main.css";
import Navmenu from "../../components/Navmenu";
import Leftnav from "../../components/Leftnav";
import { Grid } from "semantic-ui-react";
import MainRoutes from "../../Routes/MainRoutes";

class Main extends Component {
    render() {
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
                        <MainRoutes />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Main;
