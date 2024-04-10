import React from 'react';
import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import StoreContext from "../../../StoreContext";


export function MyPostsContainer(props) {
    // let state = props.store.getState().profilePage;

    // let addPost = () => {
    //     props.store.dispatch(addPostActionCreator());
    // }
    //
    // let onPostChange = (text) => {
    //     let action = updateNewPostActionCreator(text)
    //     props.store.dispatch(action);
    // }

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().profilePage;

                    let addPost = () => {
                        store.dispatch(addPostActionCreator());
                    }

                    let onPostChange = (text) => {
                        let action = updateNewPostActionCreator(text)
                        store.dispatch(action);
                    }

                    return (
                        <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                                 postsData={state.postsData}
                                 newPostText={state.newPostText}
                                 avatars={store.getState().avatars.avatarsStore}/>
                    );
                }

            }
        </StoreContext.Consumer>);
}
