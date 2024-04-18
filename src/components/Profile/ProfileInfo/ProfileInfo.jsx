import ProfileInfoCss from "./ProfileInfo.module.css";

export function ProfileInfo(props) {
    return (
        <div>
            <div className={ProfileInfoCss.backgroundProfile}>
                <img
                    alt="Main Provile Avatar"
                    src='https://ik.imagekit.io/ikmedia/backlit.jpg'></img>
            </div>
            <div className={ProfileInfoCss.descriptionBlock}>
                {props.profile === null ? <img alt="avatarProfile" src={`${process.env.PUBLIC_URL}/img/avatar3.png`}/> :
                    <img alt="avatarProfile" src={props.profile.photos.large}/>}
            </div>
        </div>);
}
