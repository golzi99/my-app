import profileReducer, {profileActions} from "./profile-reducer";

let state = {
    postsData: [
        {id: 1, message: 'Мой первый пост за все время!', likesCount: 15},
        {id: 2, message: 'Я смогу добавить props в посты', likesCount: 27},
        {id: 3, message: 'Еще сообщение', likesCount: 2}
    ],
    profile: null,
    status: '',
};

test('length of post should be incremented', () => {
    // test data
    let action = profileActions.addPost("it-course");

    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.postsData.length).toBe(4);
});

test('message of new post should be "it-course"', () => {
    // test data
    let action = profileActions.addPost("it-course");

    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.postsData[3].message).toBe("it-course");
});

test('after deleting length of post should be decrement', () => {
    // test data
    let action = profileActions.deletePost(1);

    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.postsData.length).toBe(2);
});

test('after deleting length of post shouldn`t be decrement if id is incorrect', () => {
    // test data
    let action = profileActions.deletePost(1000);

    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.postsData.length).toBe(3);
});