import usersReducer, {InitStateType, usersActions} from "./users-reducer";
import {UserType} from "../types/types";

let state: InitStateType;

beforeEach(() => {
    state = {
        users: [{
            id: 0, name: "Pasha 0", followed: false, photos: {small: null, large: null}, status: "status 0"
        },
            {
                id: 1, name: "Pasha 1", followed: false, photos: {small: null, large: null}, status: "status 1"
            },
            {
                id: 2, name: "Pasha 2", followed: true, photos: {small: null, large: null}, status: "status 2"
            },
            {
                id: 3, name: "Pasha 3", followed: true, photos: {small: null, large: null}, status: "status 3"
            }] as Array<UserType>,
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] as Array<number> // array of users id
    }
})

test("follow success", () => {

    const newState = usersReducer(state, usersActions.followOnUserSuccess(1));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {

    const newState = usersReducer(state, usersActions.unFollowOnUserSuccess(3));

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});