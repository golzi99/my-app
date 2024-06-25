import {AppStateType} from "./redux-store";

export const selectChatMessages = (state: AppStateType) => {
    return state.chat.chatMessages;
}

export const selectStatus = (state: AppStateType) => {
    return state.chat.status;
}
