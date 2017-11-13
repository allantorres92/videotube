import {
    VIDEOS_FETCH_ALL,
    VIDEO_CLEAN
} from './types';
import axios from 'axios';
import { logout } from './';

export function loadAllVideos(sessionId,history) {
    return (dispatch) => {
      dispatch({
        type: VIDEO_CLEAN
      });

        axios.get('http://localhost:3000/videos', {
            params: {
              sessionId: sessionId
            }
          })
          .then(function (response) {
            if(response.data.status == 'error'){
              throw new Error(response.data.error);          
            }
            dispatch({
                type: VIDEOS_FETCH_ALL,
                payload: response.data.data
              });
                   
          })
          .catch(function (error) {
            if(error.toString().includes('401')){
              dispatch(logout(history));              
            }
            //dispatch({ type: AUTH_LOGIN_FAILURE, payload:error });
          });    

    };
  };