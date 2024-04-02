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
            {id: 2, message: "How Are You"},
            {id: 3, message: "Where are You!!!"},
            {id: 4, message: "dont show it for him"},
            {id: 5, message: "doubi doubi"},
            {id: 6, message: "WAZZZAAA"},
            {id: 7, message: "Welcome"}
        ],
        dialogsData: [
            {id: 1, name: "Paul", avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
            {id: 2, name: "Oleg" , avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
            {id: 3, name: "Sasha" , avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
            {id: 4, name: "Vika" , avatar: `${process.env.PUBLIC_URL}/img/avatar2.png`},
            {id: 5, name: "Liza" , avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
            {id: 6, name: "Semen" , avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
            {id: 7, name: "Cumpot" , avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`}
        ]
    },
    sideBar: {
        topFriends: [
            {name: "Paul", avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
            {name: "Oleg", avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
            {name: "Sasha", avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`}
        ]
    }
}

export default state;