import {connect} from "react-redux";
import {
    followOnUser,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    unFollowOnUser
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/preLoader/preloader";
import {usersAPI} from "../../API/api";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            }
        );
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

        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            });
    };

    _followOnUserAPI = usersAPI.followOnUserAPI;

    _unFollowOnUserAPI = usersAPI.unFollowOnUserAPI;

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader></Preloader> : null}
                <Users lastDigit={this._lastDigit} pagesCount={this._pagesCount}
                       onPageChanged={this._onPageChanged}
                       followOnUserAPI = {this._followOnUserAPI}
                       unFollowOnUserAPI = {this._unFollowOnUserAPI}
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