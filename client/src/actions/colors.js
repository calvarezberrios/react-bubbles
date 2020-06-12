import AxiosWithAuth from "../utils/AxiosWithAuth";

import {FETCH_START, FETCH_DATA_SUCCESS, FETCH_FAILURE} from "./login";

export const FETCH_EDIT_SUCCESS = "FETCH_EDIT_SUCCESS";
export const FETCH_DELETE_SUCCESS = "FETCH_DELETE_SUCCESS";

export const getColors = () => dispatch => {
    dispatch({type: FETCH_START});

    AxiosWithAuth()
        .get("/colors")
        .then(res => {
            //console.log("cea: actions/colors.js: getColors: res: ", res.data);
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_FAILURE,
                payload: err.response.status === 403 ? 
                            err.response.data.error : 
                            err.response.status === 422 || err.response.status === 400 ? 
                            err.response.data : 
                            err.message
            });
        });
}

export const editColors = color => dispatch => {
    AxiosWithAuth()
        .put(`/colors/${color.id}`, color)
        .then(res => {
            dispatch({
                type: FETCH_EDIT_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_FAILURE,
                payload: err.response.status === 403 ? 
                            err.response.data.error : 
                            err.response.status === 422 || err.response.status === 400 ? 
                            err.response.data : 
                            err.message
            });
        });
}

export const deleteColors = color => dispatch => {
    AxiosWithAuth()
        .delete(`/colors/${color.id}`)
        .then(res => {
            dispatch({
                type: FETCH_DELETE_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_FAILURE,
                payload: err.response.status === 403 ? 
                            err.response.data.error : 
                            err.response.status === 422 || err.response.status === 400 ? 
                            err.response.data : 
                            err.message
            });
        })
}

export const addColors = color => dispatch => {
    dispatch({type: FETCH_START});

    AxiosWithAuth()
        .post("/colors", color)
        .then(res => {
            //console.log("cea: actions/colors.js: getColors: res: ", res.data);
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_FAILURE,
                payload: err.response.status === 403 ? 
                            err.response.data.error : 
                            err.response.status === 422 || err.response.status === 400 ? 
                            err.response.data : 
                            err.message
            });
        });
}

