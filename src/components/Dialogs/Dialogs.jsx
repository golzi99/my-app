import DialogsCss from "./Dialogs.module.css"
import React from "react";
import {DialogItem} from "./DialogItem/DialogItem";
import {MyMessage} from "./Message/MyMessage";
import {OtherMessage} from "./Message/OtherMessage";
import {PostSmtFormFormik} from "../common/PostSmtForm/PostSmtFormFormik";


export const Dialogs = React.memo(props => {

    let id = 0;
    let dialogsElements = props.dialogsData.map(
        (d) => {
            return <DialogItem key={d.id} name={d.name} id={d.id}></DialogItem>;
        }
    );

    let messagesElements = props.messagesData.map(
        (m) => {
            id++;
            if (m.id === 0) {
                return (<MyMessage key={id} textMessage={m.message}></MyMessage>);
            } else {
                return (<OtherMessage key={id} textMessage={m.message}></OtherMessage>);
            }
        }
    );

    return (
        <div className={DialogsCss.dialogs}>
            <div className={DialogsCss.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={DialogsCss.messages}>
                {messagesElements}
                <PostSmtFormFormik></PostSmtFormFormik>
            </div>
        </div>);
});