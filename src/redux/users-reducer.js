const SHOW_MORE_USERS = "SHOW-MORE-USERS";
const FOLLOW_ON_USER = "FOLLOW-ON-USER";
const UNFOLLOW_ON_USER = "UNFOLLOW-ON-USER";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";

let initState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,

};

const usersReducer = (state = initState, action) => {

    switch (action.type) {
        case FOLLOW_ON_USER:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                }),
            };
        case UNFOLLOW_ON_USER:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                }),
            };
        case SET_USERS:
            // if(state.users.length > 0) {
            //     return state
            // }
            return { ...state,
                users: action.users,

            }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        default:
            return {
                ...state
            }
    }
}

export const setUsersAC = (users) => ({
    type: SET_USERS,
    users: users
});

export const showMoreUsersAC = () => ({
    type: SHOW_MORE_USERS
});

export const followOnUserAC = (userId) => ({
    type: FOLLOW_ON_USER,
    userId: userId
});

export const unFollowOnUserAC = (userId) => ({
    type: UNFOLLOW_ON_USER,
    userId: userId
});

export const setCurrentPageAC = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
});

export const setTotalUsersCountAC = (totalCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount: totalCount
});

export default usersReducer;