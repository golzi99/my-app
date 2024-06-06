import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";

type MessagesDataType = {
    id: number,
    message: string
}

type DialogsDataType = {
    id: number,
    message: string
}

let initState = {
    messagesData: [
        {id: 1, message: "Hi"},
        {id: 0, message: "How Are You"},
        {id: 0, message: "Where are You!!!"},
        {id: 1, message: "dont show it for him"},
        {id: 1, message: "doubi doubi"},
        {id: 0, message: "WAZZZAAA"},
        {id: 1, message: "Welcome"}
    ] as Array<MessagesDataType>,
    dialogsData: [
        {id: 1, name: "Paul"},
        {id: 2, name: "Oleg"},
        {id: 3, name: "Sasha"},
        {id: 4, name: "Vika"},
        {id: 5, name: "Liza"},
        {id: 6, name: "Semen"},
        {id: 7, name: "Cumpot"}
    ] as Array<DialogsDataType>,
}

type InitStateType = typeof initState;

const dialogsReducer = (state = initState, action: ActionsTypes): InitStateType => {

    switch (action.type) {
        case "samurai/dialogs/SEND-MESSAGE":

            let newMessage = {
                id: 0,
                message: action.message
            };

            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            };
        default:
            return {
                ...state
            }
    }
}

type ActionsTypes = InferActionsType<typeof dialogActions>;
export const dialogActions = {
    sendMessage: (newMessage: string) => ({
        type: 'samurai/dialogs/SEND-MESSAGE',
        message: newMessage
    })
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const sendNewMessage = (newMessage: string): ThunkType => async (dispatch) => {
    dispatch(dialogActions.sendMessage(newMessage));
}

export default dialogsReducer;