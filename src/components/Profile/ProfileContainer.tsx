import React, {useEffect} from "react";
import Profile from "./Profile.tsx";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, getUserProfile} from "../../redux/profile-reducer.ts";
import {useNavigate, useParams} from "react-router-dom";
import {AppDispatch, AppStateType} from "../../redux/redux-store";

const ProfileContainer: React.FC = () => {
    const navigate = useNavigate()
    const params = useParams();

    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)

    const dispatch: AppDispatch = useDispatch()

    const _getUserProfile = (userId: number) => {
        dispatch(getUserProfile(userId))
    }

    const _getStatus = (userId: number) => {
        dispatch(getStatus(userId))
    }

    let userId: number | null = +params["userId"];
    if (!userId) {
        userId = authorizedUserId;
    }

    useEffect(() => {
        if (!userId) {
            navigate("/login");
        } else {
            _getUserProfile(userId);
            _getStatus(userId);
        }
    }, [userId]);

    return (
        <div>
            <Profile isOwner={!params["userId"]}/>
        </div>
    );
}


export default ProfileContainer as React.ComponentType; //, withAuthRedirect