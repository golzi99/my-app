import {authAPI} from "../API/api";

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
        authAPI.authLoginPost(userLoginData).then(data => {
            if (data.resultCode === 0) {
                console.log(userLoginData);
                // dispatch(setEmailAndPassword(userLoginData.email, userLoginData.password, userLoginData.rememberMe));
            }
            else {
                console.log("Incorrect login or password");
            }
        });
    }
}

export default formReducer;