import {authAPI} from "../API/api";
import {getAuthUserData, setAuthUserData} from "./auth-reducer";

const SET_LOGIN_PASSWORD_USER = "SET-LOGIN-PASSWORD-USER";

let initState = {
    // email: '',
    // password: '',
    // rememberMe: false,
    // captcha: false
};

const formReducer = (state = initState, action) => {

    switch (action.type) {
        case SET_LOGIN_PASSWORD_USER:
            return {
                ...state,
                email: action.email,
                password: action.password,
                rememberMe: action.rememberMe
            }
        default:
            return {
                ...state
            }
    }
}

export const setEmailAndPassword = (email, password, rememberMe, captcha) => ({
    type: SET_LOGIN_PASSWORD_USER,
    email,
    password,
    rememberMe,
    captcha
});

export const authLoginUser = (userLoginData) => {
    return (dispatch) => {
        authAPI.login(userLoginData).then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData());
            }
            else {
                alert("Incorrect login or password");
            }
        });
    }
}

export const authLogoutUser = () => {
    return (dispatch) => {
        authAPI.logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
    }
}


export default formReducer;