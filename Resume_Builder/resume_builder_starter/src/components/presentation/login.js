import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { signIn } from '../../redux/reducers/authMiddleWare';

function Login(props) {
    // console.log(props);
    // console.log(props.auth);
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        // console.log("useEffect out")
        if (props.auth?.uid) {
            // console.log("useEffect in")
            navigate('/')
        }
    }, [props])
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const onSubmit = async () => {

        let obj = { email: email, password: password }
        // console.log(obj)

        await props.signIn(obj)
        if (props.auth.uid != null) {
            // console.log("props.signIn")
            navigate('/')
        }
        // console.log(props.auth?.uid)
        // console.log("1")
    }


    return (
        <>
            {/* If we visit the login being signed in we will be unable to see the form */}
            <>
                {props.authMine.loading ? <h4 style={{ marginTop: '10%', height: '52vh' }}>Patiently Wait...we are logging you in</h4> :
                    <div className="container med contact">
                        <div className="section funnel-section">
                            <div className="form-card">
                                <h2 className="form-heading center">Enter Login details</h2>
                                <div className="form-section">
                                    <div className="input-group full"><label>Email</label>
                                        <div className="effect"><input type="text" name="email" value={email || ''} onChange={handleEmail} /><span></span>
                                        </div>
                                    </div>

                                    <div className="input-group full"><label>Password</label>
                                        <div className="effect"><input type="password" name="password" value={password || ''} onChange={handlePassword} /><span></span>
                                        </div>
                                    </div>
                                    {props.authMine?.ErrorMessage ? <div className="input-group full">
                                        <span className="error-message" >{props.authMine?.ErrorMessage}</span>
                                    </div> : <></>}
                                    <div className="form-buttons">
                                        <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Login</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </>

        </>
    );
}

const mapStateToProps = (state) => {
    //  actual user data -> auth
    // auth mine -> loading error 
    return {
        auth: state.firebase.auth,
        authMine: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    // async work 
    // console.log("mapDispatchToProps ")
    return {
        signIn: (userData) => dispatch(signIn(userData))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)