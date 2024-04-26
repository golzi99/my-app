import DialogsCss from "./Dialogs.module.css"
import React from "react";
import {useLocation} from "react-router-dom";
import {DialogItem} from "./DialogItem/DialogItem";
import {MyMessage} from "./Message/MyMessage";
import {OtherMessage} from "./Message/OtherMessage";


export function Dialogs(props) {
    const splitLoc = useLocation().pathname.substring(1).split('/');
    let dialogRef;
    if (splitLoc.length > 1) {
        dialogRef = splitLoc[splitLoc.length - 1];
    } else
        dialogRef = "0";

    let id = 0;

    let dialogsElements = props.dialogsData.map(
        (d) => {
            let avatar = props.avatars.find((value) => {
                return value.id === d.id;
            })
            return <DialogItem key={d.id} name={d.name} id={d.id} avatar={avatar.avatar}></DialogItem>;
        }
    );

    let messagesElements = props.messagesData.map(
        (m) => {
            id++;
            if (m.id === 0) {
                const messageAvatar = props.avatars.find(object => object.id === 0).avatar;
                return (<MyMessage key={id} textMessage={m.message} avatar={messageAvatar}></MyMessage>);
            } else {
                const messageAvatar = props.avatars.find(object => object.id.toString() === dialogRef).avatar;
                return (<OtherMessage key={id} textMessage={m.message} avatar={messageAvatar}></OtherMessage>);
            }
        }
    );

    let onAddMessage = () => {
        props.sendNewMessage();
    }

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }

    return (
        <div className={DialogsCss.dialogs}>
            <div className={DialogsCss.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={DialogsCss.messages}>
                {messagesElements}
                <div className={DialogsCss.sendMessageBox}>
                    <textarea onChange={onNewMessageChange} value={props.newMessageBody}
                              placeholder="Enter your message"></textarea>
                    <button onClick={onAddMessage}>Send message</button>
                </div>
            </div>
        </div>);
}