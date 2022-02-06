// import firebase from "firebase/app";
// // import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getFirestore, collection, serverTimestamp  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
let object = require("./secrets");
const firebaseApp = initializeApp(object);
// const db = getFirestore(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export default firebaseApp;
export const storage = getStorage(firebaseApp);
/**
 * now
 * import { initializeApp } from "firebase/app";
import { getFirestore, collection, serverTimestamp  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
let object = require("./secrets");
const firebaseApp = initializeApp(object);
// const db = getFirestore(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const database = {
    users: collection(firestore, 'users'),
    serverTimestamp: serverTimestamp
}
// const db = getFirestore(app);
export default firebaseApp;
export const storage = getStorage(firebaseApp);

 */

/**
 * // import firebase from "firebase/app";
// // import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
let object = require("./secrets");
firebase.initializeApp(object);
let auth = firebase.auth();


export default auth;

 */
/**
 * working code
 * import firebase from "firebase/app";
// // import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
let object = require("./secrets");
const firebaseApp = initializeApp(object);
const auth = getAuth(firebaseApp);
// firebase.initializeApp(object);
// const auth = getAuth();
// let auth = firebase.auth();
export default auth; 
 */