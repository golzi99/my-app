import {connect} from "react-redux";
import {Users} from "./Users";
import {followOnUserAC, setUsersAC, unFollowOnUserAC} from "../../redux/users-reducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        avatars: state.avatars.avatarsStore
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        followOnUser: (userId) => {
            dispatch(followOnUserAC(userId));
        },
        unFollowOnUser: (userId) => {
            dispatch(unFollowOnUserAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        }
    };
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);