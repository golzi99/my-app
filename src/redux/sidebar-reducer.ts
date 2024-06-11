type TopFriendsType = {
    id: number,
    name: string
}

let initState = {
    topFriends: [
        {id: 1, name: "Paul"},
        {id: 2, name: "Oleg"},
        {id: 3, name: "Sasha"}
    ] as Array<TopFriendsType>
};

const sidebarReducer = (state = initState): InitStateType => {
    // switch (action.type) {
    //     default:
    //         break;
    // }
    return state;
}

export default sidebarReducer;

type InitStateType = typeof initState;