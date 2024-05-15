import {connect} from "react-redux";
import {unFollow, follow,
    setCurrentPage, requestUsers
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/preLoader/preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsersBase
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    _pagesCount = () => {
        return Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    };

    _onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader></Preloader> : null}
                <Users pagesCount={this._pagesCount}
                       onPageChanged={this._onPageChanged}
                       unFollow={this.props.unFollow}
                       follow={this.props.follow}
                       users={this.props.users}
                       currentPage={this.props.currentPage}
                       followingInProgress={this.props.followingInProgress}
                ></Users>
            </>
        );
    }
}

let mapStateToProps = (state) => ({
    users: getUsersBase(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
});

export default compose(connect(mapStateToProps, {
    setCurrentPage, unFollow, follow, requestUsers}))(UsersContainer);