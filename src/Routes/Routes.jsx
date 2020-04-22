/* eslint-disable no-fallthrough */
import React, { Component } from "react";
import { Router, Redirect } from "@reach/router";
import Main from "../containers/Main";
import Login from "../containers/Login";
import styles from "./Router.module.scss";

export default class Routes extends Component {
    render() {
        return (
            <Router className={styles.container} primary={false}>
                <Redirect noThrow from="/" to="login" />
                <Login path="login" />
                <Main path="app/*" />
            </Router>
        );
    }
}
