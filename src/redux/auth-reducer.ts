import {ResultCodeForCaptcha, ResultCodes} from "../API/api.ts";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";
import {authAPI} from "../API/auth-api.ts";
import {securityAPI} from "../API/security-api.ts";

let initState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: null as boolean,
    captchaUrl: null as string | null // null if captcha is not required
};

type InitStateType = typeof initState;

const authReducer = (state = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "samurai/auth/SET-USER-DATA":
        case "samurai/auth/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payLoad
            }
        default:
            return {...state}
    }
}

type ActionsTypes = InferActionsType<typeof authActions>;

export const authActions = {
    setAuthUserData: (userId: number, login: string, email: string, isAuth: boolean, captchaUrl: string) => ({
        type: "samurai/auth/SET-USER-DATA",
        payLoad: {
            userId,
            login,
            email,
            isAuth,
            captchaUrl
        }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: "samurai/auth/GET_CAPTCHA_URL_SUCCESS",
        payLoad: {captchaUrl}
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.authMe();

    if (response.resultCode === ResultCodes.Success) {
        let {id, login, email} = response.data;
        dispatch(authActions.setAuthUserData(id, login, email, true, null));
    }
}

type UserLoginDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

export const authLoginUser = (userLoginData: UserLoginDataType, setStatus: any): ThunkType => async (dispatch) => {
    let data = await authAPI.login(userLoginData);
    if (data.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        setStatus({error: data.messages});
    }
}

export const authLogoutUser = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === ResultCodes.Success) {
        dispatch(authActions.setAuthUserData(null, null, null, false, null));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    dispatch(authActions.getCaptchaUrlSuccess(data.url));
}

export default authReducer;