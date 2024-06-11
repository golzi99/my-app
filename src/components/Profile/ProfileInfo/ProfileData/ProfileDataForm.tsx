import React from "react";
import {createField} from "../../../common/SimpleForms/SimpleForms.tsx";
import {useFormikContext} from "formik";
import ProfileDataCss from "./ProfileDataCss.module.css"
import {ProfileType} from "../../../../types/types";

type Props = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<Props> = ({profile}) => {
    const formik = useFormikContext();

    // let hasErrorFullName = formik.errors.fullName && formik.touched.fullName;

    // let hasErrorContactFacebook = formik.errors.facebook && formik.touched.facebook;
    // let hasErrorContactWebsite = formik.errors.website && formik.touched.website;
    // let hasErrorContactVk = formik.errors.vk && formik.touched.vk;
    // let hasErrorContactTwitter = formik.errors.twitter && formik.touched.twitter;
    // let hasErrorContactInstagram = formik.errors.instagram && formik.touched.instagram;
    // let hasErrorContactYoutube = formik.errors.youtube && formik.touched.youtube;
    // let hasErrorContactGithub = formik.errors.github && formik.touched.github;
    // let hasErrorContactMainLink = formik.errors.mainLink && formik.touched.mainLink;

    let apiErrors: any;
    if (formik.status) {
        apiErrors = formik.status.errors.map((item, index) => <p key={index}>{item}</p>);
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="fullName">
                    <b>Full name: </b>
                </label>
                {createField("fullName", "fullName", "fullName", "input", formik.values.fullName, "Full Name")}
            </div>
            <div>
                <label htmlFor="lookingForAJob">
                    Looking for a job:
                </label>
                {createField("checkbox", "lookingForAJob", "lookingForAJob", "", formik.values.lookingForAJob, '')}
            </div>
            <div>
                <label htmlFor="lookingForAJobDescription">
                    <b>My professional skills: </b>
                </label>
                {createField("lookingForAJobDescription", "lookingForAJobDescription", "lookingForAJobDescription", "textarea",
                    formik.values.lookingForAJobDescription, 'Your professional skills...')}
            </div>
            <div>
                <label htmlFor="aboutMe">
                    <b>About me: </b>
                </label>
                {createField("aboutMe", "aboutMe", "aboutMe", "textarea", formik.values.aboutMe, "About you...")}
            </div>
            <div>
                <label>
                    <b>Contacts:</b>
                </label>
                <div>
                    {Object.keys(profile.contacts).map((contactTitle) => {
                        return (
                            <div key={contactTitle} className={ProfileDataCss.contact}>
                                <label htmlFor={contactTitle}>
                                    <b>{contactTitle}: </b>
                                </label>
                                {createField(contactTitle, `contacts.` + contactTitle, `contacts.` + contactTitle, "input", formik.values.contacts[contactTitle], contactTitle)}
                            </div>
                        );
                    })}
                </div>
            </div>
            <button type={"submit"}>SAVE</button>
            {apiErrors && <div>{apiErrors}</div>}
        </form>
    );
}

export default ProfileDataForm;