import MessagesCss from "./Messages.module.css"
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"

export function MyMessage(props) {
    return (
        <div className={MessagesCss.myMessage}>
            {props.textMessage}
            <img alt="avatar" src={nonProfileImg}/>
        </div>
    );
}