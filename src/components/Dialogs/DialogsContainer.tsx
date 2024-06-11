import {getDialogs, sendNewMessage} from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs.tsx";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.tsx";
import {compose} from "redux";
import {Formik} from "formik";
import {MessageSchema} from "../Utils/Validators/validators.js";
import {AppStateType} from "../../redux/redux-store";

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
    messagesData: Array<MessagesDataType>,
    allDialogs: Array<any>
}

type MapDispatchPropsType = {
    sendNewMessage: (textMessage: string) => void,
    getDialogs: () => void
}

type Props = MapStateToPropsType & MapDispatchPropsType;

const DialogsContainer: React.FC<Props> = ({dialogsData, messagesData, allDialogs, sendNewMessage, getDialogs}) => {

    useEffect(() => {
        getDialogs();
    }, []);

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

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
        allDialogs: state.dialogsPage.allDialogs
    };
}

export default compose<React.ComponentType>(connect(mapStateToProps, {
    sendNewMessage,
    getDialogs
}), withAuthRedirect)(DialogsContainer);