import MessagesCss from "./Messages.module.css"

export function MyMessage(props) {
    return (
        <div className={MessagesCss.myMessage}>
            {props.textMessage}
            <img alt="avatar" src={`../img/no-profile-picture-icon.png`}/>
        </div>
    );
}