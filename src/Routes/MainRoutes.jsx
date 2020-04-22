import React, { Component } from "react";
import { Router, Redirect } from "@reach/router";
import Dashboard from "../components/Dashboard";
import Daily from "../components/Daily";
import Monthly from "../components/Monthly";
import Yearly from "../components/Yearly";
import About from "../containers/About";
import styles from "./Router.module.scss";

export default class Routes extends Component {
    render() {
        return (
            <Router className={styles.container} primary={false}>
                <Redirect noThrow from="/" to="dashboard" />
                <Dashboard user={this.props.user} path="dashboard" />
                <Daily path="daily" />
                <Monthly path="monthly" />
                <Yearly path="yearly" />
                <About path="about" />
            </Router>
        );
    }
}
