import DialogsCss from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {MyMessage} from "./Message/MyMessage";
import {OtherMessage} from "./Message/OtherMessage";
import {useLocation} from 'react-router-dom';
import React from "react";
import {sendMessageActionCreator, updateNewMessageActionCreator} from "../../redux/dialogs-reducer";


export function Dialogs(props) {

    let newMessageElement = React.createRef();

    const splitLoc = useLocation().pathname.substring(1).split('/');
    let dialogRef;
    if (splitLoc.length > 1) {
        dialogRef = splitLoc[splitLoc.length - 1];
    } else
        dialogRef = "0";


    let dialogsElemets = props.dialogsPage.dialogsData.map(
        (d) => {
            let avatar = props.avatars.find((value) => {
                return value.id === d.id;
            })
            return <DialogItem name={d.name} id={d.id} avatar={avatar.avatar}></DialogItem>;
        }
    );

    let messagesElements = props.dialogsPage.messagesData.map(
        (m) => {

            if (m.id === 0) {
                const messageAvatar = props.avatars.find(object => object.id === 0).avatar;
                return (<MyMessage textMessage={m.message} avatar={messageAvatar}></MyMessage>);
            } else {
                const messageAvatar = props.avatars.find(object => object.id.toString() === dialogRef).avatar;
                return (<OtherMessage textMessage={m.message} avatar={messageAvatar}></OtherMessage>);
            }
        }
    );

    let newMessageBody = props.dialogsPage.newMessageBody;

    let addMessage = () => {
        props.dispatch(sendMessageActionCreator());
    }

    let onMessageChange = () => {
        let body = newMessageElement.current.value;
        props.dispatch(updateNewMessageActionCreator(body));
    }

    return (
        <div className={DialogsCss.dialogs}>
            <div className={DialogsCss.dialogsItems}>
                {dialogsElemets}
            </div>
            <div className={DialogsCss.messages}>
                {messagesElements}
                <div className={DialogsCss.sendMessageBox}>
                    <textarea onChange={onMessageChange} ref={newMessageElement}
                              value={newMessageBody} placeholder="Enter your message"></textarea>
                    <button onClick={addMessage}>Send message</button>
                </div>
            </div>
        </div>);
}