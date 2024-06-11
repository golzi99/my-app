import {BaseThunkType, InferActionsType} from "./redux-store";
import {dialogsAPI} from "../API/dialogs-api.ts";

let initState = {
    messagesData: [
        {id: 1, message: "Hi"},
        {id: 0, message: "How Are You"},
        {id: 0, message: "Where are You!!!"},
        {id: 1, message: "dont show it for him"},
        {id: 1, message: "doubi doubi"},
        {id: 0, message: "WAZZZAAA"},
        {id: 1, message: "Welcome"}
    ] as Array<IDofTextDataType>,
    dialogsData: [
        {id: 1, name: "Paul"},
        {id: 2, name: "Oleg"},
        {id: 3, name: "Sasha"},
        {id: 4, name: "Vika"},
        {id: 5, name: "Liza"},
        {id: 6, name: "Semen"},
        {id: 7, name: "Cumpot"}
    ] as Array<IDofTextDataType>,
    allDialogs: [] as Array<any>
}

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
        case "samurai/dialogs/GET_ALL_DIALOGS":
            return {
                ...state,
                allDialogs: action.allDialogs
            }
        default:
            return {
                ...state
            }
    }
}

export const dialogActions = {
    sendMessage: (newMessage: string) => ({
        type: 'samurai/dialogs/SEND-MESSAGE',
        message: newMessage
    } as const),
    getAllDialogs: (data: any) => ({
        type: "samurai/dialogs/GET_ALL_DIALOGS",
        allDialogs: data
    } as const)
}

export const sendNewMessage = (newMessage: string): ThunkType => async (dispatch) => {
    dispatch(dialogActions.sendMessage(newMessage));
}

export const getDialogs = (): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.getDialogs();
    dispatch(dialogActions.getAllDialogs(data));
}


export default dialogsReducer;

type InitStateType = typeof initState;
type ActionsTypes = InferActionsType<typeof dialogActions>;
type ThunkType = BaseThunkType<ActionsTypes>;

type IDofTextDataType = {
    id: number,
    message: string
}