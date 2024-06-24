import {ChatMessageType} from "../redux/chat-reducer.ts";

let subscribers = [] as Array<SubscriberType>

let ws: WebSocket | null

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (event: MessageEvent) => {
    let newMessages = JSON.parse(event.data)
    subscribers.forEach(sub => sub(newMessages))
};

function createChannel() {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler) // ?
    ws?.close()

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    ws?.addEventListener("close", closeHandler)
    ws?.addEventListener("message", messageHandler)
}

export const chatAPI = {
    start() {
      createChannel()
    },

    stop() {
        subscribers = []
        ws?.close()
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
    },

    subscribe(callback: SubscriberType) {
        subscribers.push(callback);
        // return () => {
        //     subscribers = subscribers.filter(sub => sub !== callback) // отписка, оставить всех кроме callback
        // }
    },

    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(sub => sub !== callback) // отписка, оставить всех кроме callback
    },

    sendMessage(message: string) {
        ws?.send(message)
    }
}

type SubscriberType = (messages: Array<ChatMessageType>) => void;