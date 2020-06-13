import {
    FETCH_START,
    FETCH_LOGIN_SUCCESS,
    FETCH_DATA_SUCCESS,
    FETCH_FAILURE
} from "../actions/login";
import { FETCH_EDIT_SUCCESS, FETCH_DELETE_SUCCESS } from "../actions/colors";

const initialState = {
    colorList: [],
    isFetching: false,
    error: ""
}

export default function colorsReducer(state = initialState, action) {

    switch(action.type) {
        case FETCH_START:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload);
            
            return {
                ...state,
                isFetching: false,
                error: ""
            };
        case FETCH_DATA_SUCCESS: 
            return {
                ...state,
                colorList: action.payload,
                isFetching: false,
                error: ""
            };
        case FETCH_EDIT_SUCCESS:
            return {
                ...state,
                colorList: state.colorList.map(color => {
                    if(color.id === action.payload.id) {
                        return action.payload;
                    }
                    return color;
                }),
                error: ""
            };
        case FETCH_DELETE_SUCCESS:
            return {
                ...state,
                colorList: state.colorList.filter(color => color.id !== action.payload),
                error: ""
            }
        case FETCH_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        default: return state;
    }
}