import MessagesCss from "./messages.modules.css"

export function MyMessage(props) {

    return (
        <div className={MessagesCss.message}>
            {props.textMessage}
        </div>
    );
}