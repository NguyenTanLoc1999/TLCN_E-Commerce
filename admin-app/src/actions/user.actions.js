import axios from "../helpers/axios";
import { authConstants, userConstants } from "./constants"

export const signup = (user) => {

    console.log(user);

    return async (dispatch) => {

        dispatch({ type:userConstants.USER_REGISTER_REQUEST });

        const res = await axios.post(`/admin/signup`, {
             ...user
        });

        if(res.status === 201) {
            const { message} = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload:{message}
            });
        }else{
            if(res.status === 400){
                dispatch({
                    tyoe: userConstants.USER_REGISTER_FAILURE,
                    payload: {error: res.data.error }
                });
            }
        }
    }
}

export const isUserLoggedIn = () =>{
    return async dispatch =>{
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token, user
                }
            });
        }else{
            dispatch({
                tyoe: authConstants.LOGIN_FAILURE,
                payload: {error: 'Failed to login' }
            });
        }
    }
}

export const isUserLoggedIn = () =>{
    return async dispatch =>{
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token, user
                }
            });
        }else{
            dispatch({
                tyoe: authConstants.LOGIN_FAILURE,
                payload: {error: 'Failed to login' }
            });
        }
    }
}