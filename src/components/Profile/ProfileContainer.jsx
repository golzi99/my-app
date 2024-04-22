import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {profileAPI} from "../../API/api";

function ProfileContainer(props) {
    let {userId} = useParams();
    if (!userId) {
        userId = 2;
    }

    useEffect(() => {
        profileAPI.getProfile(userId).then((response) => {
            props.setUserProfile(response.data);
        });
    }, [userId]);

    return (
        <div>
            <Profile profile={props.profile}/>
        </div>
    );
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)