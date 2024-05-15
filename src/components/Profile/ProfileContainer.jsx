import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";

function ProfileContainer(props) {
    let location = useLocation().pathname;
    const navigate = useNavigate()

    let {userId} = useParams();
    if (!userId) {
        userId = props.authorizedUserId;
    }

    useEffect(() => {
        if (!userId) {
            navigate("/Login");
        } else {
            props.getUserProfile(userId);
            props.getStatus(userId);
        }
    }, [userId]);

    return (
        <div>
            <Profile isAuth={props.isAuth} location={location} profile={props.profile} status={props.status}
                     updateStatus={props.updateStatus}/>
        </div>
    );
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus
}))(ProfileContainer); //, withAuthRedirect