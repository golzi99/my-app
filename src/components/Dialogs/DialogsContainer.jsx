import {sendMessageActionCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {useFormik} from "formik";
import {MessageSchema} from "../Utils/Validators/validators";

function DialogsContainer(props) {

    let formik = useFormik({
        initialValues: {
            newTextBody: ''
        },
        validationSchema: MessageSchema,
        onSubmit: (values) => {
            props.sendNewMessage(values.newTextBody);
            values.newTextBody = '';
        },
    });

    return (
        <div>
            <Dialogs {...props} formik={formik}></Dialogs>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        avatars: state.avatars.avatarsStore,
        newMessageBody: state.dialogsPage.newMessageBody,
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage: (newMessage) => {
            dispatch(sendMessageActionCreator(newMessage));
        },
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(DialogsContainer);