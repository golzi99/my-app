import {Avatar, Button, Input} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {
    ChatMessageType, sendMessage,
    startMessagesListening,
    stopMessagesListening
} from "../../redux/chat-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectChatMessages} from "../../redux/chat-selectors.ts";
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

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [])

    return (<div>
        <Messages></Messages>
        <AddMessageForm></AddMessageForm>
    </div>)
}


const Messages: React.FC = () => {

    const messages = useSelector(selectChatMessages)

    return (<div style={{height: '500px', overflowY: 'auto'}}>
        {messages.map((m: ChatMessageType, index: number) => <Message key={index} message={m}/>)}
    </div>)
};

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

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
};

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    // const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>("pending");

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
            <Button onClick={sendMessageHandler}>Send</Button>
        </div>
    </div>)
};

export default ChatPage;