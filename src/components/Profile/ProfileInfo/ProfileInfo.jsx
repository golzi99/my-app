import ProfileInfoCss from "./ProfileInfo.module.css";
import Preloader from "../../common/preLoader/preloader";

export function ProfileInfo(props) {
    if (!props.profile) {
        return (<Preloader></Preloader>);
    }

    return (
        <div>
            <div className={ProfileInfoCss.backgroundProfile}>
                <img
                    alt="Main Provile Avatar"
                    src='https://ik.imagekit.io/ikmedia/backlit.jpg'></img>
            </div>
            <div className={ProfileInfoCss.descriptionBlock}>
                <img alt="avatarProfile" src={props.profile.photos.large}/>
            </div>
        </div>);
}
