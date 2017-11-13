import { fromJS } from 'immutable';
import {
    VIDEO_FETCH,
    VIDEO_CLEAN
} from '../actions/types';

const INITIAL_STATE = fromJS({
    video: {},
    loaded:false
});


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case VIDEO_FETCH:
        return fromJS({
            ...state.toJS(),
            video: action.payload,
            loaded:true
        });
    case VIDEO_CLEAN:
        return fromJS({
            ...state.toJS(),
            video: {},
            loaded:false
        });
    default:
        return state;
    }
};