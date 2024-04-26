import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

function ProfileContainer(props) {
    let {userId} = useParams();
    if (!userId) {
        userId = 2;
    }

    useEffect(() => {
        props.setUserProfile(userId);
    }, [userId]);

    return (
        <div>
            <Profile profile={props.profile} isAuth={props.isAuth}/>
        </div>
    );
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

export default compose(connect(mapStateToProps, {setUserProfile}), withAuthRedirect)(ProfileContainer);