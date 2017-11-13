import { fromJS } from 'immutable';
import {
    VIDEOS_FETCH_ALL
} from '../actions/types';

const INITIAL_STATE = fromJS({
    videos: [],
    loaded:false
});


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case VIDEOS_FETCH_ALL:
        return fromJS({
            ...state.toJS(),
            videos: action.payload,
            loaded:true
        });
    default:
        return state;
    }
};