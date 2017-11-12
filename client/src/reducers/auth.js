  import { fromJS } from 'immutable';
  import {
    AUTH_LOAD_SUCCESS,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT_SUCCESS
  
  } from '../actions/types';

  const INITIAL_STATE = fromJS({
      loggedIn: false,
      token:null,
      isLoggingIn:false,
      error:null
  });
  
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case AUTH_LOAD_SUCCESS:
        return fromJS({
            ...state.toJS(),
            token: action.payload.token,
            loggedIn: action.payload.loggedIn
        });
    case AUTH_LOGIN_REQUEST:
        return fromJS({
            ...state.toJS(),
            isLoggingIn: true,
        });
    case AUTH_LOGIN_SUCCESS:
        return fromJS({
            ...state.toJS(),
            isLoggingIn: false,
            token: action.payload,
            loggedIn:true
        });
    case AUTH_LOGIN_FAILURE:
        return fromJS({
            ...state.toJS(),
            error: action.payload,
        });
    default:
        return state;
    }
  };
  
  