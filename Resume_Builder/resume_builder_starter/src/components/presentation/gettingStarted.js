import React from 'react';
import { skinCodes } from '../../constants/typeCodes';
import * as actionTypes from '../../redux/actionTypes';
// import { bindActionCreators } from 'redux';
import uuid from 'react-uuid'
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function GettingStarted(props) {
    let navigate = useNavigate();
    const onChange = async (skinCd) => {

        // if(props.document.id){
        //     //  props.updateDocument(props.document.id, skinCd);        
        // }
        // else{
        //     //  props.setDocument(skinCd); 
        // }

        if (props.document.id == null) {
            // set -> id, skin

            let document = {
                id: uuid(),
                skinCd: skinCd
            }
            console.log("document", document)
            props.setSkin(document);

        } else {
            //update -> skin

            props.updateSkin(skinCd);

        }
        navigate('/contact');
    }


    return (
        <div className="container med gettingStarted">
            <div className="section">
                <h1 className=" center">
                    Select a resume template to get started</h1>
                <p className=" center">
                    You’ll be able to edit and change this template later!
                </p>
                <div className="styleTemplate ">
                    {
                        skinCodes.map((value, index) => {
                            return (<div key={index} className="template-card rounded-border">
                                <i className={(value == 'demo-value' ? 'selected fa fa-check' : 'hide')} ></i>
                                <img className='' src={'/images/' + value + '.svg'} />
                                <button type="button" onClick={() => onChange(value)} className='btn-select-theme'>USE TEMPLATE</button>
                            </div>);

                        })
                    }
                </div>

            </div>
        </div>
    );

}

function mapStateToProps(store) {
    return {
        document: store.document
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSkin: (document) => {
            return dispatch({
                type: actionTypes.SET_SKIN,
                payload: document
            })
        },

        updateSkin: (skinCd) => {
            return dispatch({
                type: actionTypes.UPDATE_SKIN,
                payload: skinCd
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GettingStarted)