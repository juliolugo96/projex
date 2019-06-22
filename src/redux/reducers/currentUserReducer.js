import {LOG_OUT_FULFILLED, LOG_IN_FULFILLED, LOG_OUT_REJECTED, LOG_IN_REJECTED, 
    CLEAR_CURRENT_USER_ERRORS, LOGGING_IN, CHANGE_LANGUAGE} from '../actions/currentUserActions';

const initialState = {
    email: '',
    password: '',
    token: '',
    profilePhotoUrl: '',
    language: undefined,
    isLogged: false,
    loading: false,
    errors: [],
};

export default currentUserReducer = (state=initialState, action) => {
    switch(action.type){
        case LOGGING_IN:
            return {...state, loading: true}
        case LOG_IN_FULFILLED:
            return {...state, ...action.payload, errors: [], isLogged: true, loading: false};
        case LOG_IN_REJECTED:
            return {...state, errors: [action.payload] };
        case LOG_OUT_FULFILLED:
            return initialUserState;
        case LOG_OUT_REJECTED:
            return {...state, errors: [action.payload] };
        case CLEAR_CURRENT_USER_ERRORS:
            return {...state, errors: []};
        case CHANGE_LANGUAGE:
            return {...state, language: action.payload}
        default:
            return state;
    }
}