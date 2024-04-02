import DialogsCss from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";


export function Dialogs(props) {

    let dialogsElemets = props.dialogs.dialogsData.map(
        (d) => {
            return <DialogItem name={d.name} id={d.id} avatar={d.avatar}></DialogItem>
        }
    );

    let messagesElements = props.dialogs.messagesData.map(
        (m) => {
            return <Message textMessage={m.message}></Message>
        }
    );

    return (
        <div className={DialogsCss.dialogs}>
            <div className={DialogsCss.dialogsItems}>
                {dialogsElemets}
            </div>
            <div className={DialogsCss.messages}>
                {messagesElements}
            </div>
        </div>);
}