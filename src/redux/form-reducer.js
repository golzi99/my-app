import {authAPI} from "../API/api";

const SET_LOGIN_PASSWORD_USER = "SET-LOGIN-PASSWORD-USER";

let initState = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: false
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

export const setEmailAndPassword = (email, password, rememberMe) => ({
    type: SET_LOGIN_PASSWORD_USER,
    email,
    password,
    rememberMe
});

export const authLoginUser = (userLoginData) => {
    return (dispatch) => {
        authAPI.authLoginPost(userLoginData).then(data => {
            if (data.resultCode === 0) {
                dispatch(setEmailAndPassword(userLoginData.email, userLoginData.password, userLoginData.rememberMe));
            }
        });
    }
}

export default formReducer;