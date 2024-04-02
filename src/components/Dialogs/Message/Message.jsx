import DialogsCss from "./../Dialogs.module.css"

export function Message(props) {
    return (
        <div className={DialogsCss.message}>
            {props.textMessage}
        </div>
    );
}