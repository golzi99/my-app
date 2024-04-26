import {sendMessageActionCreator, updateNewMessageActionCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

function DialogsContainer(props) {
    return (
        <div>
            <Dialogs {...props}></Dialogs>
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
        updateNewMessageBody: (body) => {
            let action = updateNewMessageActionCreator(body);
            dispatch(action);
        },
        sendNewMessage: () => {
            dispatch(sendMessageActionCreator());
        },
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(DialogsContainer);