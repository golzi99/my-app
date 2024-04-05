import DialogsCss from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {MyMessage} from "./Message/MyMessage";


export function Dialogs(props) {

    let dialogsElemets = props.dialogsPage.dialogsData.map(
        (d) => {
            let avatar = props.avatars.find((value, index, array) => {
                return value.id === d.id;
            })
            return <DialogItem name={d.name} id={d.id} avatar={avatar.avatar}></DialogItem>;
        }
    );

    let messagesElements = props.dialogsPage.messagesData.map(
        (m) => {
            return (<MyMessage textMessage={m.message}></MyMessage>);
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