import {
    VIDEO_FETCH,
    SAVE_RATING
} from './types';
import axios from 'axios';
import { logout } from './';

export function loadVideo(videoId,sessionId,history) {
    return (dispatch) => {
      
        axios.get('http://localhost:3000/video', {
            params: {
              sessionId: sessionId,
              videoId:videoId
            }
          })
          .then(function (response) {
            if(response.data.status == 'error'){
              throw new Error(response.data.error);          
            }
            dispatch({
                type: VIDEO_FETCH,
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

  export function saveRating(videoId, rating, sessionId,history) {
    return (dispatch) => {
        axios.post('http://localhost:3000/video/ratings?sessionId='+sessionId, {
          videoId: videoId,
          rating: rating
        })
          .then(function (response) {
            if(response.data.status == 'error'){
              throw new Error(response.data.error);          
            }
            dispatch({
              type: SAVE_RATING
            });            
          })
          .catch(function (error) {
            if(error.toString().includes('401')){
              dispatch(logout(history));              
            }
            console.log(error);
            //dispatch({ type: AUTH_LOGIN_FAILURE, payload:error });
          });    

    };
  };