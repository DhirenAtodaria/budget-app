import authReducer from "./authReducer";

import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { dataReducer } from "./dataReducer";

export default combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    spendings: dataReducer,
});
