import {authAPI} from "../API/api";

const SET_USER_DATA = "SET-USER-DATA";

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

export const getAuthUserData = () => {
    return (dispatch) => {
        return authAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                let {id, login, email} = data.data;
                dispatch(setAuthUserData(id, login, email, true));
            }
        });
    }
}

export const authLoginUser = (userLoginData, setStatus) => {
    return (dispatch) => {
        authAPI.login(userLoginData).then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                setStatus({error: data.messages});
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

export default authReducer;