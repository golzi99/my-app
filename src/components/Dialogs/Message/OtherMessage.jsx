import MessagesCss from "./messages.modules.css"

export function OtherMessage(props) {

    return (
        <div className={MessagesCss.message}>
            {props.textMessage}
        </div>
    );
}