import React from "react";
import {sendMessageActionCreator, updateNewMessageActionCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import StoreContext from "../../StoreContext";


export function DialogsContainer(props) {
    // let state = props.store.getState().dialogsPage;
    //
    // let newMessageBody = state.newMessageBody;
    // let messagesData = state.messagesData;
    // let dialogsData = state.dialogsData;
    // let avatars = props.store.getState().avatars.avatarsStore;
    //
    // let addMessage = () => {
    //     props.store.dispatch(sendMessageActionCreator());
    // }
    //
    // let messageChange = (body) => {
    //     let action = updateNewMessageActionCreator(body);
    //     props.store.dispatch(action);
    // }

    return (
        <StoreContext.Consumer>
            {
                (store) => {

                    let state = store.getState().dialogsPage;

                    let newMessageBody = state.newMessageBody;
                    let messagesData = state.messagesData;
                    let dialogsData = state.dialogsData;
                    let avatars = store.getState().avatars.avatarsStore;

                    let addMessage = () => {
                        store.dispatch(sendMessageActionCreator());
                    }

                    let messageChange = (body) => {
                        let action = updateNewMessageActionCreator(body);
                        store.dispatch(action);
                    }

                    return (
                        <Dialogs addMessage={addMessage} updateNewMessageBody={messageChange}
                                 newMessageBody={newMessageBody} dialogsData={dialogsData}
                                 messagesData={messagesData} avatars={avatars}/>
                    );
                }
            }
        </StoreContext.Consumer>

    );
}