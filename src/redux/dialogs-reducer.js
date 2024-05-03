const SEND_MESSAGE = 'SEND-MESSAGE';

let initState = {
    messagesData: [
        {id: 1, message: "Hi"},
        {id: 0, message: "How Are You"},
        {id: 0, message: "Where are You!!!"},
        {id: 1, message: "dont show it for him"},
        {id: 1, message: "doubi doubi"},
        {id: 0, message: "WAZZZAAA"},
        {id: 1, message: "Welcome"}
    ],
    dialogsData: [
        {id: 1, name: "Paul"},
        {id: 2, name: "Oleg"},
        {id: 3, name: "Sasha"},
        {id: 4, name: "Vika"},
        {id: 5, name: "Liza"},
        {id: 6, name: "Semen"},
        {id: 7, name: "Cumpot"}
    ],
}

const dialogsReducer = (state = initState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:

            let newMessage = {
                id: 0,
                message: action.message
            };

            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };
        default:
            return {
                ...state
            }
    }
}

export const sendMessageActionCreator = (newMessage) => ({
    type: SEND_MESSAGE,
    message: newMessage
});

export default dialogsReducer;