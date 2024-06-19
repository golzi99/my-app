import ProfileInfoCss from "./ProfileInfo.module.css";
import Preloader from "../../common/preLoader/preloader.tsx";
import React, {ChangeEvent, useState} from "react";
import ProfileStatus from "./ProfileStatus/ProfileStatus.tsx";
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"
import ProfileData from "./ProfileData/ProfileData.tsx";
import ProfileDataForm from "./ProfileData/ProfileDataForm.tsx";
import {FormikProvider, useFormik} from "formik";
import {WebSiteSchema} from "../../Utils/Validators/validators.js";
import {ProfileType} from "../../../types/types";
import {savePhoto, saveProfile} from "../../../redux/profile-reducer.ts";
import {AppDispatch} from "../../../redux/redux-store";
import {useDispatch} from "react-redux";

type PropsType = {
    profile: ProfileType,
    isOwner: boolean
}

const ProfileInfo: React.FC<PropsType> = ({profile, isOwner}) => {

    let [editMode, setEditMode] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    const _savePhoto = (photo: File) => {
        dispatch(savePhoto(photo))
    }

    const _saveProfile = (profileData: ProfileType, setStatus: any) => {
        dispatch(saveProfile(profileData, setStatus))
    }

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            contacts: profile.contacts,
        },
        validationSchema: WebSiteSchema,
        onSubmit:
             async (values, submitProps) => {
                let profileData: ProfileType = {
                    fullName: values.fullName,
                    lookingForAJob: values.lookingForAJob,
                    lookingForAJobDescription: values.lookingForAJobDescription,
                    aboutMe: values.aboutMe,
                    contacts: values.contacts
                };
                await _saveProfile(profileData, submitProps.setStatus);
                setEditMode(false);
            }
    });

    if (!profile) {
        return (<Preloader></Preloader>);
    }

    const _onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            _savePhoto(e.target.files[0]);
        }
    };

    return (
        <div>
            <div className={ProfileInfoCss.descriptionBlock}>
                <div>
                    {isOwner ?
                        <label role={"button"} title={"Edit your profile photo"}>
                            <input type={"file"} accept={"image/png, image/jpeg"} style={{display: "none"}}
                                   onChange={_onMainPhotoSelected}/>
                            <img className={ProfileInfoCss.profileImg} alt="avatarProfile"
                                 src={profile.photos.large || nonProfileImg}/>
                        </label>
                        :
                        <img alt="avatarProfile" src={profile.photos.large || nonProfileImg}/>
                    }
                </div>
                {editMode ?
                    <FormikProvider value={formik}>
                        <ProfileDataForm profile={profile}></ProfileDataForm>
                    </FormikProvider>
                    :
                    <ProfileData profile={profile}></ProfileData>
                }
                <ProfileStatus isOwner={isOwner}></ProfileStatus>
                {(isOwner && !editMode) && <button onClick={() => {
                    setEditMode(true);
                }}>Edit</button>}
            </div>
        </div>
    );
}

export default ProfileInfo;