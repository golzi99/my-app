import {authAPI} from "../API/api";

const SET_USER_DATA = "samurai/auth/SET-USER-DATA";

let initState = {
    userId: null,
    email: null,
    login: null,
    isAuth: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data}
        default:
            return {...state}
    }
}

export const setAuthUserData = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA,
    data: {
        userId,
        login,
        email,
        isAuth
    }
})

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
        } else {
            setStatus({error: data.messages});
        }
    });
}

export const authLogoutUser = () => (dispatch) => {
    authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    });
}

export default authReducer;