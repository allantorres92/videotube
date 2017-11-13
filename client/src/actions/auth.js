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
        if(response.data.status == 'error'){
          throw new Error(response.data.error);          
        }

        window.localStorage.setItem('token', response.data.sessionId);
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload:response.data.sessionId });
        history.replace("/");
      })
      .catch(function (error) {
        console.log(error)
        dispatch({ type: AUTH_LOGIN_FAILURE, payload:error });
      });
      
    };
  };

  export function logout(history) {
    return (dispatch) => {
      window.localStorage.removeItem('token');
      dispatch({ type: AUTH_LOGOUT_SUCCESS });
      history.replace("/");      
    };
  };

  export function logoutByUser(sessionId,history) {
    return (dispatch) => {


      axios.get('http://localhost:3000/user/logout', {
        params: {
          sessionId: sessionId
        }
      })
      .then(function (response) {
        if(response.data.status == 'error'){
          throw new Error(response.data.error);          
        }
        window.localStorage.removeItem('token');
        dispatch({ type: AUTH_LOGOUT_SUCCESS });
        location.reload();
      })
      .catch(function (error) {
        //fallback to logout anyways
        if(error.toString().includes('401')){
          dispatch(logout(history));              
        }
        //dispatch({ type: AUTH_LOGIN_FAILURE, payload:error });
      });    



         
    };
  };


  