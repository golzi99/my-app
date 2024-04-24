import {authAPI} from "../API/api";

const SET_USER_DATA = "SET-USER-DATA";

let initState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    isFetching: false
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true}
        default:
            return {...state}
    }
}

export const setAuthUserData = (userId, login, email) => ({
    type: SET_USER_DATA,
    data: {
        userId,
        login,
        email
    }
})

export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                let {id, login, email} = data.data;
                dispatch(setAuthUserData(id, login, email));
            }
        });
    }
}

export default authReducer;