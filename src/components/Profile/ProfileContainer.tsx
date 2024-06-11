import React, {useEffect} from "react";
import Profile from "./Profile.tsx";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer.ts";
import {useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void,
    savePhoto: (photo: any) => void,
    saveProfile: (profileData: ProfileType, setStatus: any) => Promise<any>,
};


type Props = MapStateToPropsType & MapDispatchPropsType;

const ProfileContainer: React.FC<Props> = ({
                                               profile,
                                               status,
                                               authorizedUserId,
                                               isAuth,
                                               getUserProfile,
                                               getStatus,
                                               updateStatus,
                                               saveProfile,
                                               savePhoto
                                           }) => {
    const navigate = useNavigate()
    const params = useParams();

    let userId: number | null = +params["userId"];
    if (!userId) {
        userId = authorizedUserId;
    }

    useEffect(() => {
        if (!userId) {
            navigate("/login");
        } else {
            getUserProfile(userId);
            getStatus(userId);
        }
    }, [userId]);

    return (
        <div>
            <Profile isAuth={isAuth} profile={profile} status={status}
                     isOwner={!params["userId"]} updateStatus={updateStatus} savePhoto={savePhoto}
                     saveProfile={saveProfile}/>
        </div>
    );
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(connect(mapStateToProps,
    {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}))(ProfileContainer) as React.ComponentType; //, withAuthRedirect