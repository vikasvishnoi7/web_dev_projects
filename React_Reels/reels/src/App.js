import React, { useContext, useEffect } from 'react'
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom"
import Feed from './components/Feed'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'

import { AuthContext, AuthProvider } from './contexts/AuthContext'
// let isSingedup = true;
function App() {
    // useEffect(()=>{
    //     console.log("App is rendered");
    // })
    return (
        <>
            <AuthProvider>
                <Router>

                    <Routes>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        {/* <PrivateRoute path="/" element={<Feed />}></PrivateRoute> */}
                        <Route path="/profile/:id" element={< PrivateRoute ><Profile /></PrivateRoute>} ></Route>
                        <Route path="/" element={< PrivateRoute ><Feed /></PrivateRoute>} ></Route>
                    </Routes>

                </Router>
            </AuthProvider>
        </>
    )
}

function PrivateRoute({ children }) {
    let { currentUser } = useContext(AuthContext);
    console.log("in private route", currentUser);
    return (
        currentUser != null ? children : <Navigate to="/login" />
    )
}

export default App




//npm i firebase-tools -g  for deployment
// firebase login -> enter in terminal
/**
 * render = {
            (props)=>{
                isSingedup == true ? <Component {...props}></Component> : <Navigate to="/login"></Navigate>
            }
 */
//     < Route
// exact
// path = "/admin/users"
// element = {
//               < PrivateRoute >
//     <Users />
//               </PrivateRoute >
//             }
// />


// function PrivateRoute({ children }) {
//     const auth = useAuth();
//     return auth.user ? children : <Navigate to="/login" />;
// }