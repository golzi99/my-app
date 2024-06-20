import MessagesCss from "./Messages.module.css"
import nonProfileImg from "../../../assets/img/noProfilePictureIcon.png"

type PropsType = {
    textMessage: string
}

const MyMessage: React.FC<PropsType> = ({textMessage}) => {
    return (
        <div className={MessagesCss.myMessage}>
            {textMessage}
            <img alt="avatar" src={nonProfileImg}/>
        </div>
    );
}

export default MyMessage;