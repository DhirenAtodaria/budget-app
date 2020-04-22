/* eslint-disable no-fallthrough */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Redirect } from "@reach/router";
import Main from "../containers/Main";
import Login from "../containers/Login";
import styles from "./Router.module.scss";

class Routes extends Component {
    render() {
        return (
            <Router className={styles.container} primary={false}>
                {!this.props.authStatus ? (
                    <Redirect noThrow from="/" to="/app" />
                ) : (
                    <Redirect noThrow from="/" to="/login" />
                )}
                <Login path="login" />
                <Main path="app/*" />
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return { authStatus: state.firebase.auth.isEmpty };
};

export default connect(mapStateToProps)(Routes);
