import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { authReducer } from "./authReducer";
import { dataReducer } from "./dataReducer";
import { dashboardReducer } from "./dashboardReducer";

export default combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    spendings: dataReducer,
    dashboardData: dashboardReducer,
});
