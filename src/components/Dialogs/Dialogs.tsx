import DialogsCss from "./Dialogs.module.css"
import React from "react";
import DialogItem from "./DialogItem/DialogItem.tsx";
import MyMessage from "./Message/MyMessage.tsx";
import OtherMessage from "./Message/OtherMessage.tsx";
import PostedForm from "../common/PostSmtForm/PostedForm.tsx";
import {DialogsDataType, MessagesDataType} from "./DialogsContainer";
import {useFormikContext} from "formik";

type Props = {
    dialogsData: Array<DialogsDataType>,
    messagesData: Array<MessagesDataType>
}

const Dialogs: React.FC<Props> = React.memo(({dialogsData, messagesData}) => {

    let id = 0;
    let dialogsElements = dialogsData.map(
        (d) => {
            return <DialogItem key={d.id} name={d.name} id={d.id}></DialogItem>;
        }
    );

    let messagesElements = messagesData.map(
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
                <PostedForm {...useFormikContext()}></PostedForm>
            </div>
        </div>);
});

export default Dialogs;