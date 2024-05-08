import {connect} from "react-redux";
import {unFollow, follow,
    setCurrentPage, getUsers
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/preLoader/preloader";
import {compose} from "redux";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    _lastDigit = (num) => {
        return num % 10;
    };

    _pagesCount = () => {
        return Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    };

    _onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader></Preloader> : null}
                <Users lastDigit={this._lastDigit} pagesCount={this._pagesCount}
                       onPageChanged={this._onPageChanged}
                       unFollow={this.props.unFollow}
                       follow={this.props.follow}
                       users={this.props.users}
                       avatars={this.props.avatars}
                       currentPage={this.props.currentPage}
                       followingInProgress={this.props.followingInProgress}
                ></Users>
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
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
});

export default compose(connect(mapStateToProps, {
    setCurrentPage, unFollow, follow, getUsers}))(UsersContainer);