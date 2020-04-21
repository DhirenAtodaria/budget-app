import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose, getState } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase from "./firebase";

import "./index.scss";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reactReduxFirebase(firebase, { attachAuthIsReady: true }),
        reduxFirestore(firebase)
    )
);

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById("root")
    );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
