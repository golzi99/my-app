import {Avatar, Button, Input} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {ChatMessageType, getChatMessagesData} from "../../redux/chat-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectChatMessages} from "../../redux/chat-selectors.ts";
import {AppDispatch} from "../../redux/redux-store";

const {TextArea} = Input;

const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

const ChatPage: React.FC = () => {
    return (<div>
        <Chat></Chat>
    </div>)
}

const Chat: React.FC = () => {
    return (<div>
        <Messages></Messages>
        <AddMessageForm></AddMessageForm>
    </div>)
}


const Messages: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()

    const messages = useSelector(selectChatMessages);

    const addMessages = (chatMessages) => {
        dispatch(getChatMessagesData(chatMessages));
    }

    useEffect(() => {
        wsChannel.addEventListener('message', (event: MessageEvent) => {
            let newMessages = JSON.parse(event.data)
            addMessages(newMessages);
        })
        // return () => {
        //     wsChannel.addEventListener("close", (event) => {
        //         console.log(event)
        //     })
        // }
    }, [])

    return (<div style={{height: '500px', overflowY: 'auto'}}>
        {messages.map((m: ChatMessageType, index: number) => <Message key={index} message={m}/>)}
    </div>)
};

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return (<div>
        <span>
            <Avatar size={32} src={message.photo} icon={<UserOutlined/>}></Avatar>
            <b style={{padding:'5px'}}>{message.userName}</b>
        </span>
        <div>
            {message.message}
        </div>
        <hr/>
    </div>)
};

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>("pending");

    useEffect(() => {
        wsChannel.addEventListener('open', () => {
            setReadyStatus("ready")
        })
    }, [])

    const sendMessage = () => {
        if(!message) return;
        wsChannel.send(message)
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
            <Button disabled={readyStatus !== "ready"} onClick={sendMessage}>Send</Button>
        </div>
    </div>)
};

export default ChatPage;