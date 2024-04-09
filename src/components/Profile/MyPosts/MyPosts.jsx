import Posts from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import React from 'react';
import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profile-reducer";

export function MyPosts(props) {
    let postsElements = props.postsData.map((p) => {
        let avatar = props.avatars.find((value) => {
            return value.id === 0;
        })
        return (<Post message={p.message} likesCount={p.likesCount} avatar={avatar.avatar}></Post>)
    })

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(updateNewPostActionCreator(text));
    }

    return (
        <div className={Posts.postsBlock}>
            <h3>My posts</h3>
            <div>New Post
                <div className={Posts.postEnterText}>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={Posts.postList}>
                {postsElements}
            </div>
        </div>);
}
