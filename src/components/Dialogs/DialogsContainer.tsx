import {sendNewMessage} from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs.tsx";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {Formik} from "formik";
import {MessageSchema} from "../Utils/Validators/validators";

export type MessagesDataType = {
    id: number,
    message: string
}

export type DialogsDataType = {
    id: number,
    message: string
}

type MapStateToPropsType = {
    dialogsData: Array<DialogsDataType>,
    messagesData: Array<MessagesDataType>
}

type MapDispatchPropsType = {
    sendNewMessage: (textMessage: string) => void
}

type Props = MapStateToPropsType & MapDispatchPropsType;

const DialogsContainer: React.FC<Props> = ({dialogsData, messagesData, sendNewMessage}) => {

    return (
        <Formik
            initialValues={{
                newTextBody: ''
            }}
            validationSchema={MessageSchema}
            onSubmit={
                (values) => {
                    sendNewMessage(values.newTextBody);
                    values.newTextBody = '';
                }
            }
        >
                <Dialogs dialogsData={dialogsData} messagesData={messagesData}></Dialogs>
        </Formik>
    );
}

let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
    };
}

export default compose(connect(mapStateToProps, {sendNewMessage}), withAuthRedirect)(DialogsContainer);