import * as contactActions from '../actionTypes'
import initialState from '../initialState.json'

export default function contactReducer(state = initialState.contactSection, action) {
    // console.log("action in cr", action.payload);
    switch (action.type) {

        case contactActions.SET_CONTACT:
            return action.payload;

        case contactActions.UPDATE_CONTACT:
            return {
                // copy orginal object 
                ...action.payload
            }

        default:
            return state;
    }
}



























// import initialState from './initialState.json'
// import * as contactActions from '../actions/actions'

// const contactReducer = (state = initialState.contact, action) => {
//     switch (action.type) {
//         case contactActions.SET_CONTACT:
//             return { ...action.pay }
//         case contactActions.UPDATE_CONTACT:
//             return { ...action.payload }
//         default: return state
//     }
// }

// export default contactReducer;