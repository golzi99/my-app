import {AppStateType} from "./redux-store";

export const getUserId = (state: AppStateType) => {
    return state.auth.userId;
}

export const getEmail = (state: AppStateType) => {
    return state.auth.email;
}

export const selectLogin = (state: AppStateType) => {
    return state.auth.login;
}

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl;
}
