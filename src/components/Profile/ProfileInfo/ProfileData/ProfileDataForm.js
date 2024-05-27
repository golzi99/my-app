import React from "react";
import {createField} from "../../../common/SimpleForms/SimpleForms";
import {useFormikContext} from "formik";
import ProfileDataCss from "./ProfileDataCss.module.css"

function ProfileDataForm({profile}) {
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

    let apiErrors;
    if(formik.status) {
        apiErrors = formik.status.errors.map((item, index) => <p key={index}>{item}</p>);
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="fullName">
                    <b>Full name: </b>
                </label>
                {createField("fullName", "fullName", "fullName", "Full Name", "input", formik.values.fullName)}
                {/*{hasErrorFullName && <div>{formik.errors.fullName}</div>}*/}
            </div>
            <div>
                <label htmlFor="lookingForAJob">
                    Looking for a job:
                </label>
                {createField("checkbox", "lookingForAJob", "lookingForAJob", '', "", formik.values.lookingForAJob)}
            </div>
            <div>
                <label htmlFor="lookingForAJobDescription">
                    <b>My professional skills: </b>
                </label>
                {createField("lookingForAJobDescription", "lookingForAJobDescription", "lookingForAJobDescription",
                    'Your professional skills...', "textarea", formik.values.lookingForAJobDescription)}
                {/*{hasErrorEmail && <div>{formik.errors.email}</div>}*/}
            </div>
            <div>
                <label htmlFor="aboutMe">
                    <b>About me: </b>
                </label>
                {createField("aboutMe", "aboutMe", "aboutMe", "About you...", "textarea", formik.values.aboutMe)}
                {/*{hasErrorEmail && <div>{formik.errors.email}</div>}*/}
            </div>
            <div>
                <label>
                    <b>Contacts:</b>
                </label>
                <div>
                    {Object.entries(profile.contacts).map(([contactTitle, contactValue]) => {
                        return (
                            <div key={contactTitle} className={ProfileDataCss.contact}>
                                <label htmlFor={contactTitle}>
                                    <b>{contactTitle}: </b>
                                </label>
                                {createField(contactTitle, `contacts.` + contactTitle, `contacts.` + contactTitle, contactTitle, "input", formik.values.contacts[contactTitle])}
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