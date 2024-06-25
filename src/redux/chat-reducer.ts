import {BaseThunkType, InferActionsType} from "./redux-store";
import {chatAPI} from "../API/chat-api.ts";
import {Dispatch} from "redux";
import {v1} from "uuid"

let initState = {
    chatMessages: [] as Array<ChatMessageType> | [],
    status: "pending" as StatusType
};

const chatReducer = (state = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "samurai/chat/MESSAGES_RECEIVED":
            return {
                ...state,
                chatMessages: [...state.chatMessages, ...action.payload.chatMessages.map(m => ({...m, id: v1()}))].filter(
                    (m, index, array) => index >= array.length - 25
                )
            }
        case "samurai/chat/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }
        case "samurai/chat/RESET_MESSAGES":
            return {
                ...state,
                chatMessages: []
            }
        default:
            return {
                ...state
            }
    }
}

const chatActions = {
    messagesReceived: (chatMessages: Array<ChatMessageAPIType>) => ({
        type: "samurai/chat/MESSAGES_RECEIVED",
        payload: {chatMessages}
    } as const),
    resetMessages: () => ({
        type: "samurai/chat/RESET_MESSAGES",
    } as const),
    statusChanged: (status: StatusType) => ({
        type: "samurai/chat/STATUS_CHANGED",
        payload: {status}
    } as const)
}

let _newMessageHandler: ((messages: Array<ChatMessageAPIType>) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (chatMessages) => {
            dispatch(chatActions.messagesReceived(chatMessages))
        }
    }
    return _newMessageHandler
}

let _newStatusChangedHandler: ((status: StatusType) => void) | null = null

const newStatusChangedCreator = (dispatch: Dispatch) => {
    if (_newStatusChangedHandler === null) {
        _newStatusChangedHandler = (status) => {
            dispatch(chatActions.statusChanged(status))
        }
    }
    return _newStatusChangedHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("status-changed", newStatusChangedCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("status-changed", newStatusChangedCreator(dispatch))
    chatAPI.stop()
    dispatch(chatActions.resetMessages())
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;

type InitStateType = typeof initState;
type ActionsTypes = InferActionsType<typeof chatActions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export type ChatMessageAPIType = {
    message: string,
    photo?: string,
    userId: number,
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'

export type ChatMessageType = ChatMessageAPIType & {id: string}