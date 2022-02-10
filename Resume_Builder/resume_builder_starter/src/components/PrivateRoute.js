import React from 'react'
import { Navigate } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux';
// import { getAuth } from "firebase/auth";

function PrivateRoute({ auth, children }) {
    // const auth = getAuth();
    return (
        isLoaded(auth) && !isEmpty(auth) ? children : <Navigate to='/' />
    )
}

function mapStateToProps(state) {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute)






/**
 * 
 * import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux';

function PrivateRoute({ auth, component: Component, ...remainingprops }) {

    return (
        <Route {...remainingprops} render={(props) => (
            isLoaded(auth) && !isEmpty(auth) ?
                <Component {...props} /> : <Redirect to='/' />
        )} />
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute)
 */