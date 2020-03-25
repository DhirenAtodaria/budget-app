import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDgwgqpQf71Q7Sy2KK4G4aiPiyqyo0cRlU",
    authDomain: "personal-project-budget.firebaseapp.com",
    databaseURL: "https://personal-project-budget.firebaseio.com",
    projectId: "personal-project-budget",
    storageBucket: "personal-project-budget.appspot.com",
    messagingSenderId: "192207216810",
    appId: "1:192207216810:web:3c3dc60961e1fc55bf70d3"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
 