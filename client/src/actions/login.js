import AxiosWithAuth from "../utils/AxiosWithAuth";

export const FETCH_START = "FETCH_START";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const login = user => dispatch => {
    dispatch({type: FETCH_START});

    AxiosWithAuth()
        .post("/login", user) 
        .then(res => {
            dispatch({
                type: FETCH_LOGIN_SUCCESS,
                payload: res.data.payload
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_FAILURE,
                payload: err.response.status === 403 ? err.response.data.error : err.message
            });
        })
}