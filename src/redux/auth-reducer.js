import {authAPI, securityAPI} from "../API/api";

const SET_USER_DATA = "samurai/auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai/auth/GET_CAPTCHA_URL_SUCCESS";

let initState = {
    userId: null,
    email: null,
    login: null,
    isAuth: null,
    captchaUrl: null // null if captcha is not required
};

const authReducer = (state = initState, action) => {
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

export const setAuthUserData = (userId, login, email, isAuth, captchaUrl) => ({
    type: SET_USER_DATA,
    payLoad: {
        userId,
        login,
        email,
        isAuth,
        captchaUrl
    }
})

const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payLoad: {captchaUrl}
});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.authMe();

    if (response.resultCode === 0) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const authLoginUser = (userLoginData, setStatus) => (dispatch) => {
    authAPI.login(userLoginData).then(data => {
        if (data.resultCode === 0) {
            dispatch(getAuthUserData());
        }
        else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            setStatus({error: data.messages});
        }
    });
}

export const authLogoutUser = () => (dispatch) => {
    authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false, null));
        }
    });
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;