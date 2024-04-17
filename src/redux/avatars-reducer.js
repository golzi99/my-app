let initState = {
    avatarsStore: [
        {id: 0, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
        {id: 1, avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
        {id: 2, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
        {id: 3, avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
        {id: 4, avatar: `${process.env.PUBLIC_URL}/img/avatar2.png`},
        {id: 5, avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
        {id: 6, avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
        {id: 7, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
        {id: 8, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
        {id: 9, avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
    ]
};

const avatarsReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            break;
    }
    return state;
}

export default avatarsReducer;