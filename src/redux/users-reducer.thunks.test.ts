import {follow, unFollow, usersActions} from "./users-reducer";
import {usersAPI} from "../API/users-api";
import {ApiResponseType, ResultCodes} from "../API/api";

jest.mock("../API/users-api")
const usersAPIMock = usersAPI as jest.MockedObject<typeof usersAPI>

const result: ApiResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodes.Success
}

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.followOnUserAPI.mockClear()
    usersAPIMock.unFollowOnUserAPI.mockClear()
    // вызываем метод mockClear() у всех моков
})


test("Success follow thunk",async () => {

    usersAPIMock.followOnUserAPI.mockReturnValue(Promise.resolve(result));

    const thunk = follow(1);


    //@ts-ignore
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followOnUserSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleIsFollowingProgress(false, 1))
});

test("Success unfollow thunk",async () => {

    usersAPIMock.unFollowOnUserAPI.mockReturnValue(Promise.resolve(result));

    const thunk = unFollow(1);

    //@ts-ignore
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unFollowOnUserSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleIsFollowingProgress(false, 1))
});