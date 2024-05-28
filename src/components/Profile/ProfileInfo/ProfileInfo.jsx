import ProfileInfoCss from "./ProfileInfo.module.css";
import Preloader from "../../common/preLoader/preloader";
import React, {useState} from "react";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileData/ProfileDataForm";
import {FormikProvider, useFormik} from "formik";
import {WebSiteSchema} from "../../Utils/Validators/validators";

export function ProfileInfo({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) {

    let [editMode, setEditMode] = useState(false);

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
                let profileData = {
                    fullName: values.fullName,
                    lookingForAJob: values.lookingForAJob,
                    lookingForAJobDescription: values.lookingForAJobDescription,
                    aboutMe: values.aboutMe,
                    contacts: values.contacts
                };
                 // saveProfile(profileData, submitProps.setStatus).then(()=> {
                 //     setEditMode(false);
                 // }).catch(() => {
                 //
                 // });
                await saveProfile(profileData, submitProps.setStatus);
                setEditMode(false);
            }
    });

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
                    <FormikProvider value={formik}>
                        <ProfileDataForm profile={profile} setEditMode={setEditMode}></ProfileDataForm>
                    </FormikProvider>
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
