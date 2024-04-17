import {sendMessageActionCreator, updateNewMessageActionCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";

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

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);