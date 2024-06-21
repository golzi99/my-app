import {Avatar, Button, Input} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

const {TextArea} = Input;

const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

export type ChatMessageType = {
    message: string,
    photo?: string,
    userId: number,
    userName: string
}

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

    const [messages, setMessages] = useState<Array<ChatMessageType>>([]);

    useEffect(() => {
        wsChannel.addEventListener('message', (event: MessageEvent) => {
            let newMessages = JSON.parse(event.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages] )
        })
    }, [])

    return (<div style={{height: '500px', overflowY: 'auto'}}>
        {messages.map((m: any, index) => <Message key={index} message={m}/>)}
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
            <Button onClick={sendMessage}>Send</Button>
        </div>
    </div>)
};


export default ChatPage;