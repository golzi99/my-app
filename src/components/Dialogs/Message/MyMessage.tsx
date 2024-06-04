import MessagesCss from "./Messages.module.css"
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"

type Props = {
    textMessage: string
}

const MyMessage: React.FC<Props> = ({textMessage}) => {
    return (
        <div className={MessagesCss.myMessage}>
            {textMessage}
            <img alt="avatar" src={nonProfileImg}/>
        </div>
    );
}

export default MyMessage;