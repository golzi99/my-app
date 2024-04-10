import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";

let mapStateToProps = (state) => {
    return {
        avatars: state.avatars.avatarsStore,
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = updateNewPostActionCreator(text)
            dispatch(action);
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        },
    };
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);