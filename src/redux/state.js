import {rendApp} from "../render";

let state = {
    profilePage: {
        postsData: [
            {id: 1, message: 'Мой первый пост за все время!', likesCount: 15},
            {id: 2, message: 'Я смогу добавить props в посты', likesCount: 27},
            {id: 3, message: 'Еще сообщение', likesCount: 2}
        ],
        avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`,
    },
    dialogsPage: {
        messagesData: [
            {id: 1, message: "Hi"},
            {id: 1, message: "How Are You"},
            {id: 1, message: "Where are You!!!"},
            {id: 1, message: "dont show it for him"},
            {id: 0, message: "doubi doubi"},
            {id: 0, message: "WAZZZAAA"},
            {id: 0, message: "Welcome"}
        ],
        dialogsData: [
            {id: 1, name: "Paul", avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
            {id: 2, name: "Oleg" , avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
            {id: 3, name: "Sasha" , avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
            {id: 4, name: "Vika" , avatar: `${process.env.PUBLIC_URL}/img/avatar2.png`},
            {id: 5, name: "Liza" , avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
            {id: 6, name: "Semen" , avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
            {id: 7, name: "Cumpot" , avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`}
        ],
    },
    sideBar: {
        topFriends: [
            {name: "Paul", avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
            {name: "Oleg", avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
            {name: "Sasha", avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`}
        ]
    },
    avatars: [
        {id: 0, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
        {id: 1, avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
        {id: 2, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
        {id: 3, avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
        {id: 4, avatar: `${process.env.PUBLIC_URL}/img/avatar2.png`},
        {id: 5, avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
        {id: 6, avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
        {id: 7, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`}
    ]
}

export let addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0
    };
    state.profilePage.postsData.push(newPost);
    rendApp(state);
};

export default state;