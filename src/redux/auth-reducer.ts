import {authAPI, securityAPI} from "../API/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = "samurai/auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai/auth/GET_CAPTCHA_URL_SUCCESS";

// type InitStateType = {
//     userId: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean | null,
//     captchaUrl: string | null // null if captcha is not required
// }

let initState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: null as boolean,
    captchaUrl: null as string | null // null if captcha is not required
};

type InitStateType = typeof initState;

type ActionsTypes = SetAuthUserDataType | GetCaptchaUrlSuccessType;

const authReducer = (state = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payLoad
            }
        default:
            return {...state}
    }
}

type SetAuthUserDataPayloadType = {
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payLoad: SetAuthUserDataPayloadType
}

export const setAuthUserData = (userId: number, login: string, email: string, isAuth: boolean, captchaUrl: string): SetAuthUserDataType => ({
    type: SET_USER_DATA,
    payLoad: {
        userId,
        login,
        email,
        isAuth,
        captchaUrl
    }
})

type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payLoad: { captchaUrl: string }
}

const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payLoad: {captchaUrl}
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.resultCode === 0) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, login, email, true, null));
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
    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        setStatus({error: data.messages});
    }
}

export const authLogoutUser = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;