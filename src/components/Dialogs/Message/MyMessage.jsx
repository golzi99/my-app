import MessagesCss from "./Messages.module.css"

export function MyMessage(props) {
    return (
        <div className={MessagesCss.myMessage}>
            {props.textMessage}
            <img alt="avatar" src={props.avatar}/>
        </div>
    );
}