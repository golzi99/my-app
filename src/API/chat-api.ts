import {ChatMessageAPIType, StatusType} from "../redux/chat-reducer.ts";

const subscribers = {
    "messages-received": [] as Array<MessagesReceivedSubscriberType>,
    "status-changed": [] as Array<StatusChangedSubscriberType>
}

let ws: WebSocket | null

const closeHandler = () => {
    notifyAboutStatus("pending");
    setTimeout(createChannel, 3000)
}

const messageHandler = (event: MessageEvent) => {
    let newMessages = JSON.parse(event.data)
    subscribers["messages-received"].forEach(sub => sub(newMessages))
};

const openHandler = () => {
    notifyAboutStatus("ready");
}

const errorHandler = () => {
    notifyAboutStatus("error");
    console.log("REFRESH PAGE")
}

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
    ws?.removeEventListener("open", openHandler)
    ws?.removeEventListener("error", errorHandler)
}

const notifyAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach((s) => s(status))

}

function createChannel() {
    cleanUp()
    ws?.close()

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifyAboutStatus("pending");
    ws?.addEventListener("close", closeHandler)
    ws?.addEventListener("message", messageHandler)
    ws?.addEventListener("open", openHandler)
    ws?.addEventListener("error", errorHandler)
}

export const chatAPI = {
    start() {
      createChannel()
    },

    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        ws?.close()
        cleanUp()
    },

    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback);
    },

    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(sub => sub !== callback) // отписка, оставить всех кроме callback
    },

    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessagesReceivedSubscriberType = (messages: Array<ChatMessageAPIType>) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;
type EventsNamesType = "messages-received" | "status-changed"