import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";

function ProfileContainer(props) {
    const navigate = useNavigate()
    const params = useParams();

    let userId = params["userId"];
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
            <Profile isAuth={props.isAuth} profile={props.profile} status={props.status}
                     isOwner={!params["userId"]} updateStatus={props.updateStatus} savePhoto={props.savePhoto}
                     saveProfile={props.saveProfile}/>
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
    updateStatus,
    savePhoto,
    saveProfile,
}))(ProfileContainer); //, withAuthRedirect