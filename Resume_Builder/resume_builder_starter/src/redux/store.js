import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
// import { getFirestore } from "firebase/firestore";
import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import firebaseConfig from '../secrets'
// import { initializeApp } from "firebase/app";
import { composeWithDevTools } from 'redux-devtools-extension';
let firebaseConfig = require("../secrets");
// const app = initializeApp(firebaseConfig);
// getFirestore();
firebase.initializeApp(firebaseConfig);
firebase.firestore()

// let store = createStore(rootReducer);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebase)));

export default store;