import ProfileInfoCss from "./ProfileInfo.module.css";
import Preloader from "../../common/preLoader/preloader";
import React, {useState} from "react";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileData/ProfileDataForm";
import {Formik} from "formik";

export function ProfileInfo({profile, status, updateStatus, isOwner, savePhoto}) {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return (<Preloader></Preloader>);
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    return (
        <div>
            <div className={ProfileInfoCss.descriptionBlock}>
                <div className={ProfileInfoCss.avatarEditable}>
                    {isOwner ?
                        <label role={"button"} title={"Edit your profile photo"}>
                            <input type={"file"} accept={"image/png, image/jpeg"} style={{display: "none"}}
                                   onChange={onMainPhotoSelected}/>
                            <img className={ProfileInfoCss.profileImg} alt="avatarProfile"
                                 src={profile.photos.large || nonProfileImg}/>
                        </label>
                        :
                        <img alt="avatarProfile" src={profile.photos.large || nonProfileImg}/>
                    }
                </div>
                {editMode ?
                    <Formik
                        initialValues={{

                        }}
                        onSubmit={
                            () => {
                                setEditMode(false)
                            }
                        }
                    >
                        <ProfileDataForm profile={profile} setEditMode={setEditMode}></ProfileDataForm>
                    </Formik>
                    :
                    <ProfileData profile={profile}></ProfileData>
                }
                <ProfileStatus status={status} isOwner={isOwner}
                               updateStatus={updateStatus}></ProfileStatus>
                {(isOwner && !editMode) && <button onClick={() => {
                    setEditMode(true);
                }}>Edit</button>}
            </div>
        </div>
    );
}
