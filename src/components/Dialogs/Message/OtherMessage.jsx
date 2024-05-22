import MessagesCss from "./Messages.module.css"

export function OtherMessage(props) {

    return (
        <div className={MessagesCss.otherMessage}>
            <img alt="avatar" src={`../img/no-profile-picture-icon.png`}/>
            {props.textMessage}
        </div>
    );
}