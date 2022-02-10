import * as authActions from "../actionTypes";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
let firebaseConfig = require("../../secrets");
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

// thunk

const registerRequest = () => {
    return {
        type: authActions.REGISTER_REQUEST,
    }
}

const registerSuccess = () => {
    return {
        type: authActions.REGISTER_SUCCESS
    }
}

const registerFailed = (err) => {
    console.log("register", err)
    return {
        type: authActions.REGISTER_FAILED,
        error: err
    }
}

const removeError = () => {
    return {
        type: authActions.REMOVE_ERROR
    }
}

// new one -> working code
export const register = (userData) => {
    console.log('register authmid')
    return (dispatch) => {
        console.log('register authmid return in')
        dispatch(registerRequest())

        createUserWithEmailAndPassword(auth, userData.email, userData.password).then(async (data) => {
            const res = await setDoc(doc(db, 'users', data.user.uid), {
                email: userData.email,
                resumeIds: []
            })
            dispatch(registerSuccess())
        }).catch((err) => {
            dispatch(registerFailed(err))
            setTimeout(() => {
                dispatch(removeError())
            }, 2000)
        })

    }
}





const signInRequest = () => {
    return {
        type: authActions.SIGN_IN_REQUEST,
    }
}

const signInSuccess = () => {
    return {
        type: authActions.SIGN_IN_SUCCESS
    }
}

const signInFailed = (err) => {
    console.log("err", err);
    return {

        type: authActions.SIGN_IN_FAILED,
        error: err
    }
}



//new one -> working code
export const signIn = (userData) => {
    console.log("authMiddle")
    return async (dispatch) => {
        dispatch(signInRequest())


        try {
            const data = await signInWithEmailAndPassword(auth, userData.email, userData.password);
            console.log("signIn data.user.uid ", data.user.uid);
            dispatch(signInSuccess())
        } catch (err) {
            console.log("hi")
            dispatch(signInFailed(err))
            setTimeout(() => {
                dispatch(removeError())
            }, 2000)
        }
    }
}

//new one -> working code
export const signout = () => {
    return (dispatch) => {

        signOut(auth).then(() => {
            dispatch({ type: authActions.SIGN_OUT_SUCCESS })
        }).catch((err) => {
            dispatch({ type: authActions.SIGN_OUT_FAILED, error: err })
            setTimeout(() => {
                dispatch(removeError())
            }, 2000)
        })
    }
}












// old one  -> working code
// export const signout = () => {
//     return (dispatch, getState, { getFirebase }) => {
//         const firebase = getFirebase()
//         firebase.auth().signOut().then(() => {
//             dispatch({ type: authActions.SIGN_OUT_SUCCESS })
//         }).catch((err) => {
//             dispatch({ type: authActions.SIGN_IN_FAILED, error: err })
//             setTimeout(() => {
//                 dispatch(removeError())
//             }, 2000)
//         })
//     }
// }

// old one  -> working code
// export const signIn = (userData) => {
//     return async (dispatch, getState, { getFirestore, getFirebase }) => {
//         dispatch(signinRequest())
//         const firebase = getFirebase();
//         // const firestore = getFirestore();
//         try {
//             const res = await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
//             dispatch(signInSuccess())
//         } catch (err) {
//             dispatch(signInFailed(err))
//             setTimeout(() => {
//                 dispatch(removeError())
//             }, 2000)
//         }
//     }
// }

// old one -> working code
// export const register = (userData) => {
//     console.log('register authmid')
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         console.log('register authmid return in')
//         dispatch(registerRequest())
//         const firebase = getFirebase();
//         const firestore = getFirestore();
//         firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).then(async (data) => {
//             const res = await firestore.collection('users').doc(data.user.uid).set({
//                 email: userData.email,
//                 resumeIds: []
//             })
//             dispatch(registerSuccess())
//         }).catch((err) => {
//             dispatch(registerFailed(err))
//             setTimeout(() => {
//                 dispatch(removeError())
//             }, 2000)
//         })
//     }
// }






