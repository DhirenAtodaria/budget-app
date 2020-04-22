import React, { Component } from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "./Main.css";
import Navmenu from "../../components/Navmenu";
import Leftnav from "../../components/Leftnav";
import { Grid } from "semantic-ui-react";
import MainRoutes from "../../Routes/MainRoutes";
import Login from "../Login";
import { globalHistory } from "@reach/router";

class Main extends Component {
    render() {
        if (this.props.authStatus) {
            globalHistory.navigate("/");
            return <Login />;
        } else {
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
}

const mapStateToProps = (state) => {
    return { authStatus: state.firebase.auth.isEmpty };
};

export default connect(mapStateToProps)(Main);
