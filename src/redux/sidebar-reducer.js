let initState = {
    topFriends: [
        {id: 1, name: "Paul"},
        {id: 2, name: "Oleg"},
        {id: 3, name: "Sasha"}
    ]
};

const sidebarReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            break;
    }
    return state;
}

export default sidebarReducer;