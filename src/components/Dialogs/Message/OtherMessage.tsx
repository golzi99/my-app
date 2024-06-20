import MessagesCss from "./Messages.module.css"
import nonProfileImg from "../../../assets/img/noProfilePictureIcon.png"

type PropsType = {
    textMessage: string
}

const OtherMessage: React.FC<PropsType> = ({textMessage}) => {
    return (
        <div className={MessagesCss.otherMessage}>
            <img alt="avatar" src={nonProfileImg}/>
            {textMessage}
        </div>
    );
}

export default OtherMessage;