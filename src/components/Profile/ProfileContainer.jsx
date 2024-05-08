import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

function ProfileContainer(props) {
    let {userId} = useParams();
    if (!userId) {
        userId = props.authorizedUserId;
    }

    useEffect(() => {
        props.setUserProfile(userId);
        props.getStatus(userId);
    }, [userId]);

    return (
        <div>
            <Profile profile={props.profile} status={props.status} initialized={props.initialized}
                     updateStatus={props.updateStatus}/>
        </div>
    );
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    initialized: state.app.initialized
});

export default compose(connect(mapStateToProps, {
    setUserProfile,
    getStatus,
    updateStatus
}), withAuthRedirect)(ProfileContainer);