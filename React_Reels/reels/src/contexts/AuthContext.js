import React, {useState,useEffect} from 'react'
// import auth from '../firebase';
import firebaseApp from '../firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
export const AuthContext = React.createContext();
let auth = getAuth(firebaseApp)
// let auth = getAuth()///////////////

export function AuthProvider({children}) {
    
    const [currentUser, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function login(auth,email, password){
        console.log("async...")
        return signInWithEmailAndPassword(auth, email, password);
    }

  function signout(auth){
        return signOut(auth);
    }

    function signup(auth, email, password){
        console.log("inside signup..")
        return createUserWithEmailAndPassword(auth, email, password);
    }


    useEffect(() => {
        console.log("add event Listener")
        const unsubscribe = onAuthStateChanged(auth,user =>{
            console.log("inside listner", user)
            setUser(user);
            setLoading(false)
        })
        return unsubscribe;
    }, []);
    const value = {
        login, signout,signup,currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
            {console.log("inside auth context")}
        </AuthContext.Provider>
    )
    
}


