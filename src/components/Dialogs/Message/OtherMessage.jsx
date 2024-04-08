import MessagesCss from "./Messages.module.css"

export function OtherMessage(props) {

    return (
        <div className={MessagesCss.otherMessage}>
            <img alt="avatar" src={props.avatar}/>
            {props.textMessage}
        </div>
    );
}