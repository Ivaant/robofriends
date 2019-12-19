import { CHANGE_SEARCH_FIELD } from './constants.js';

const initialState = {
    reducuerField: ''
};

export const searchRobots = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_SEARCH_FIELD:
            console.log(action.payload)
            return { ...state, reducuerField: action.payload };
        default:
            return state;
    }
}