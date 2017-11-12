import {
    AUTH_LOAD_SUCCESS,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT_SUCCESS
} from './types';
import axios from 'axios';
import md5 from 'js-md5';


export function loadAuth() {
    return (dispatch) => {
      const token = window.localStorage.getItem('token');
      var loggedIn = false;
      if(token){
        loggedIn = true;
      }
      dispatch({
        type: AUTH_LOAD_SUCCESS,
        payload: {token,loggedIn}
      });
    };
  };

  export const login = (data,history) => {
  
    return (dispatch) => {
      dispatch({ type: AUTH_LOGIN_REQUEST, payload:data });
      
      axios.post('http://localhost:3000/user/auth', {
        username: data.username,
        password: md5(data.password)
      })
      .then(function (response) {
        console.log(response);
        if(response.data.status == 'error'){
          throw new Error(response.data.error);          
        }

        window.localStorage.setItem('token', response.data.sessionId);
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload:response.data.sessionId });
        history.replace("/");
      })
      .catch(function (error) {
        console.log('allan')
        console.log(error)
        dispatch({ type: AUTH_LOGIN_FAILURE, payload:error });
      });
      
    };
  };
  