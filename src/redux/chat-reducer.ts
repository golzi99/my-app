import {BaseThunkType, InferActionsType} from "./redux-store";

let initState = {
    chatMessages: [] as Array<ChatMessageType> | []
};

const chatReducer = (state = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "samurai/chat/SET-MESSAGE-DATA":
            return {
                ...state,
                chatMessages: [...state.chatMessages, ...action.chatMessages]
            }
        default:
            return {
                ...state
            }
    }
}

const chatActions = {
    setMessageData: (chatMessages: Array<ChatMessageType>) => ({
        type: "samurai/chat/SET-MESSAGE-DATA",
        chatMessages
    } as const)
}

export const getChatMessagesData = (chatMessages: Array<ChatMessageType>): ThunkType => async (dispatch) => {
    dispatch(chatActions.setMessageData(chatMessages))
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