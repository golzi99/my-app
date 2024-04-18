import {connect} from "react-redux";
import {
    followOnUser,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    unFollowOnUser
} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/preLoader/preloader";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(r => {
                this.props.toggleIsFetching(false);
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
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(r => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(r.data.items);
            });
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader></Preloader> : null}
                <Users lastDigit={this._lastDigit} pagesCount={this._pagesCount}
                       onPageChanged={this._onPageChanged}
                       unFollowOnUser={this.props.unFollowOnUser}
                       followOnUser={this.props.followOnUser}
                       users={this.props.users}
                       avatars={this.props.avatars}
                       currentPage={this.props.currentPage}></Users>
            </>
        );
    }
}

let mapStateToProps = (state) => ({
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        avatars: state.avatars.avatarsStore,
        isFetching: state.usersPage.isFetching
});

export default connect(mapStateToProps, {
    followOnUser,
    unFollowOnUser,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(UsersContainer);