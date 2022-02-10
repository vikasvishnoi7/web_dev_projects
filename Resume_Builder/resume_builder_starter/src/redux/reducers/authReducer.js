import initialState from '../initialState.json';

import * as actionTypes from "../actionTypes";

export default function authReducer(state = initialState.auth, action) {
    switch (action.type) {


        case actionTypes.SIGN_IN_REQUEST:
            return {
                ErrorMessage: "",
                loading: true
            }

        case actionTypes.SIGN_IN_SUCCESS:
            return {
                loading: false,
                ErrorMessage: ""

            }

        case actionTypes.SIGN_IN_FAILED:
            // console.log("sign failed", actionTypes.SIGN_IN_FAILED)
            return {

                ErrorMessage: action.error.message,
                loading: false

            }

        case actionTypes.REGISTER_REQUEST:
            return {
                loading: true,
                ErrorMessage: ""
            }

        case actionTypes.REGISTER_SUCCESS:
            return {
                loading: false,
                ErrorMessage: ""
            }

        case actionTypes.REGISTER_FAILED:
            return {
                loading: false,
                ErrorMessage: action.error.message
            }

        case actionTypes.REMOVE_ERROR:
            return {
                loading: false,
                ErrorMessage: ""
            }

        default:
            return state;
    }
}


