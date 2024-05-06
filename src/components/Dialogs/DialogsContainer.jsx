import {sendMessageActionCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {Formik} from "formik";
import {MessageSchema} from "../Utils/Validators/validators";

function DialogsContainer(props) {

    return (
        <Formik
            initialValues={{
                newTextBody: ''
            }}
            validationSchema={MessageSchema}
            onSubmit={
                (values) => {
                    props.sendNewMessage(values.newTextBody);
                    values.newTextBody = '';
                }
            }
        >
            {({errors, touched}) => (
                <Dialogs {...props} errors={errors} touched={touched}></Dialogs>
            )}
        </Formik>
    );
}

let mapStateToProps = (state) => {
    return {
        avatars: state.avatars.avatarsStore,
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