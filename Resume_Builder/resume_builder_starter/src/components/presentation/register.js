import React, { useState } from "react";
import { isLoaded } from 'react-redux-firebase'
import { connect } from "react-redux";
import { register } from '../../redux/reducers/authMiddleWare';
import { useNavigate } from "react-router";
function Register(props) {

    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = async () => {

        const res = await props.register({ email: email, password: password })

        if (props?.auth != null) {

            navigate('/');
        }
    }


    return (
        <>
            {/* To save from multiple request */}
            {!isLoaded(props.auth) ? <></> : <>
                {props.authMine.loading ? <h4 style={{ marginTop: '10%', height: '52vh' }}>Patiently Wait...we are resgistering you in</h4> :
                    <div className="container med contact">
                        <div className="section funnel-section">
                            <div className="form-card">

                                <h2 className="form-heading center">Enter your details</h2>
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
                                        <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Register</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                }
            </>
            }
        </>
    );
}

function mapStateToProps(state) {
    return {
        authMine: state.auth,
        auth: state.firebase.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (userData) => {
            return dispatch(
                register(userData)
            )
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)