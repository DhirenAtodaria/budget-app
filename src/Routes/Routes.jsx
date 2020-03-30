/* eslint-disable no-fallthrough */
import React, { Component } from 'react';
import { Router, Redirect, globalHistory, createHistory, LocationProvider} from '@reach/router'
import createHashSource from 'hash-source'
import Main from '../containers/Main';
import Login from '../containers/Login';
import styles from './Router.module.scss';
import firebase, { firestore } from '../firebase';

let source = createHashSource();
let history = createHistory(source)

export default class Routes extends Component {
    state = {
        user: null,
        additionalUserInfo: null,
        signUpFormData: {
            email: "",
            password: "",
            name: "",
            budget: null
        },
        loginFormData: {
            email: "",
            password: ""
        },
        error: false,
        content: "",
        errorMessage1: null,
        errorMessage2: null,
        errorMessage3: null,
        errorMessage4: null,
        error2: false,
        content2: ""
    }

    errorReset = () => {
        console.log("resetted")
        this.setState({
            error: false,
            content: "",
            errorMessage1: null,
            errorMessage2: null,
            errorMessage3: null,
            errorMessage4: null,
            error2: false,
            content2: ""
        })
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                localStorage.setItem("user", user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem("user");
            }
        });
    }

    handleDetails = event => {
        this.setState({
            signUpFormData: {
                ...this.state.signUpFormData,
                [event.target.name]: event.target.value
            }
        });
    };

    handleDetailsLogin = event => {
        this.setState({
            loginFormData: {
                ...this.state.loginFormData,
                [event.target.name]: event.target.value
            }
        });
    };

    signIn = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(
                this.state.loginFormData.email,
                this.state.loginFormData.password
            )
            .catch((errors) => {
                this.errorReset();
                let code = errors.code;
                switch (code) {
                    case 'auth/invalid-email':
                        this.setState({errorMessage3: {content: "Please enter a valid email adrress", pointing: "below"}})
                        break
                    case 'auth/wrong-password':
                        this.setState({errorMessage4: {content: "The password you have entered in incorrect."}})
                        break
                    case 'auth/user-not-found':
                        console.log("notfound")
                        this.setState({error2: true, content2: "There isn't an account associated with that e-mail address."})
                        break
                    default:
                        this.setState({error2: true, content: `An error has occured. Code: ${code}`})
                }
                return false
            })
            .then(result => {
                if (result) {
                    this.setState({
                        user: result.user,
                        additionalUserInfo: result.additionalUserInfo
                    });
                    globalHistory.navigate("/app"); 
                }
            })
    }

    signUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.signUpFormData.email,
                this.state.signUpFormData.password
            )
            .catch((errors) => {
                let code = errors.code;
                this.errorReset();
                switch (code) {
                    case 'auth/invalid-email':
                        this.setState({errorMessage1: {content: "Please enter a valid email adrress", pointing: "below"}})
                        break
                    case 'auth/weak-password':
                        this.setState({errorMessage2: {content: "Please enter a stronger password"}})
                        break
                    case 'auth/email-already-in-use':
                        this.setState({error: true, content: "You can only sign up for an account once with a given e-mail address."})
                        break
                    default:
                        this.setState({error: true, content: `An error has occured. Code: ${code}`})
                }
                return false
            })
            .then(result => {
                if (result) {
                    this.setState({
                        user: result.user,
                        additionalUserInfo: result.additionalUserInfo
                    }, this.additionalSignUp);
                }
            })
    }

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.setState({ user: null });
                globalHistory.navigate("/");
            });
    };

    additionalSignUp = () => {
        firestore
            .collection("users")
            .add({
                uid: this.state.user.uid,
                name: this.state.signUpFormData.name,
                budget: this.state.signUpFormData.budget,
            })
            .then(() => {
                globalHistory.navigate("/app");
            })
    }
    
    render() {
        return(
            <LocationProvider history={history}>
            <Router className={styles.container} primary={false}>
                <Redirect noThrow from="/" to="login" />
                <Main user={this.state.user} signOut={this.signOut} path="app/*" />
                <Login 
                    error={this.state.error} 
                    error2={this.state.error2}
                    content={this.state.content} 
                    content2={this.state.content2}
                    errorMessage1={this.state.errorMessage1}
                    errorMessage2={this.state.errorMessage2}
                    errorMessage3={this.state.errorMessage3}
                    errorMessage4={this.state.errorMessage4}
                    loginFormData={this.state.loginFormData} 
                    signUpFormData={this.state.signUpFormData} 
                    signIn={this.signIn} signUp={this.signUp} 
                    handleDetailsLogin={this.handleDetailsLogin} 
                    handleDetails={this.handleDetails} 
                    path="login" 
                />
            </Router>
            </LocationProvider>
        )
    }
}