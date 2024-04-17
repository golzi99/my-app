import {connect} from "react-redux";
import {
    followOnUserAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unFollowOnUserAC
} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";

class UsersContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(r => {
                this.props.setUsers(r.data.items);
                this.props.setTotalUsersCount(r.data.totalCount);
            });
    }

    _lastDigit = (num) => {
        return num % 10;
    };

    _pagesCount = () => {
        return Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    };

    _onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(r => {
                this.props.setUsers(r.data.items);
            });
    };

    render() {
        return (
            <Users lastDigit={this._lastDigit} pagesCount={this._pagesCount}
                   onPageChanged={this._onPageChanged}
                   unFollowOnUser={this.props.unFollowOnUser}
                   followOnUser={this.props.followOnUser}
                   users={this.props.users}
                   avatars={this.props.avatars}
                   currentPage={this.props.currentPage}></Users>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
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
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);