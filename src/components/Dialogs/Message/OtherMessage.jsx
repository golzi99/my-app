import MessagesCss from "./Messages.module.css"
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"

export function OtherMessage(props) {

    return (
        <div className={MessagesCss.otherMessage}>
            <img alt="avatar" src={nonProfileImg}/>
            {props.textMessage}
        </div>
    );
}