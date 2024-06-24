import {BaseThunkType, InferActionsType} from "./redux-store";
import {chatAPI} from "../API/chat-api.ts";
import {Dispatch} from "redux";

let initState = {
    chatMessages: [] as Array<ChatMessageType> | []
};

const chatReducer = (state = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "samurai/chat/MESSAGES_RECEIVED":
            return {
                ...state,
                chatMessages: [...state.chatMessages, ...action.payload]
            }
        default:
            return {
                ...state
            }
    }
}

const chatActions = {
    messagesReceived: (chatMessages: Array<ChatMessageType>) => ({
        type: "samurai/chat/MESSAGES_RECEIVED",
        payload: chatMessages
    } as const)
}

let _newMessageHandler: ((messages: Array<ChatMessageType>) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (chatMessages) => {
            dispatch(chatActions.messagesReceived(chatMessages))
        }
    }
    return _newMessageHandler

}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;

type InitStateType = typeof initState;
type ActionsTypes = InferActionsType<typeof chatActions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export type ChatMessageType = {
    message: string,
    photo?: string,
    userId: number,
    userName: string
}