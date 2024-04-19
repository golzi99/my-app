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

export default authReducer;