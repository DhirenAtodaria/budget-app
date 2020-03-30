import React, { Component } from 'react';
import { Router, Redirect, createHistory, LocationProvider } from '@reach/router'
import createHashSource from 'hash-source'
import Dashboard from '../components/Dashboard';
import Daily from '../components/Daily';
import Monthly from '../components/Monthly';
import Yearly from '../components/Yearly';
import styles from './Router.module.scss';

let source = createHashSource();
let history = createHistory(source)

export default class Routes extends Component {
    render() {
        return(
            <LocationProvider history={history}>
            <Router className={styles.container} primary={false}>
                <Redirect noThrow from="/" to="dashboard" />
                <Dashboard user={this.props.user} path="dashboard" />
                <Daily user={this.props.user} path="daily" />
                <Monthly user={this.props.user} path="monthly" />
                <Yearly user={this.props.user} path="yearly" />
            </Router>
            </LocationProvider>
        )
    }
} 