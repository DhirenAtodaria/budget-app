import { globalHistory } from "@reach/router";

export const signIn = (credentials) => (
    dispatch,
    getState,
    { getFirebase }
) => {
    const firebase = getFirebase();

    firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((result) => {
            dispatch({ type: "LOGIN_SUCCESS", result });
        })
        .then(() => {
            globalHistory.navigate("/app");
        })
        .catch((errors) => {
            dispatch({ type: "LOGIN_ERROR", errors });
        });
};

export const signUp = (credentials) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((result) => {
            dispatch({ type: "LOGIN_SUCCESS", result });
            firestore.collection("users").add({
                uid: result.user.uid,
                name: credentials.name,
                budget: credentials.budget,
            });
        })
        .then(() => {
            globalHistory.navigate("/app");
        })
        .catch((errors) => {
            dispatch({ type: "LOGIN_ERROR_2", errors });
        });
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
    globalHistory.navigate("/");
    const firebase = getFirebase();
    firebase.auth().signOut();
};
