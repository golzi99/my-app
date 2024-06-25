import {Avatar, Button, Input} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import {ChatMessageType, sendMessage,
    startMessagesListening,
    stopMessagesListening
} from "../../redux/chat-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectChatMessages, selectStatus} from "../../redux/chat-selectors.ts";
import {AppDispatch} from "../../redux/redux-store.ts";

const {TextArea} = Input;

//add info about chanel status and if connect error -> disable smt

const ChatPage: React.FC = () => {
    return (<div>
        <Chat></Chat>
    </div>)
}

const Chat: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const status = useSelector(selectStatus)

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [])

    return (<div>
        {status === "error" && <div>Error. Refresh the page</div>}
        <div>
            <Messages></Messages>
            <AddMessageForm></AddMessageForm>
        </div>
    </div>)
}


const Messages: React.FC = () => {

    const messagesAnchorRef = useRef<HTMLDivElement | null>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)
    const messages = useSelector(selectChatMessages)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 50) {
            !isAutoScroll && setIsAutoScroll(true)
        }
        else {
            isAutoScroll && setIsAutoScroll(false)
        }

    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return (<div style={{height: '500px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m: ChatMessageType) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>)
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return (<div>
        <span>
            <Avatar size={32} src={message.photo} icon={<UserOutlined/>}></Avatar>
            <b style={{padding: '5px'}}>{message.userName}</b>
        </span>
        <div>
            {message.message}
        </div>
        <hr/>
    </div>)
})

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')

    const status = useSelector(selectStatus)
    const dispatch: AppDispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) return;
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (<div>
        <div>
            <TextArea
                onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}
                placeholder="Message..."
                autoSize={{minRows: 2, maxRows: 6}}
            />
        </div>
        <div>
            <Button disabled={status !== "ready"} onClick={sendMessageHandler}>Send</Button>
        </div>
    </div>)
};

export default ChatPage;