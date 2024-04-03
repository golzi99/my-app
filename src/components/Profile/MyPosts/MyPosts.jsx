import Posts from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import React from 'react';

export function MyPosts(props) {
    const avatar = props.avatar;

    let postsElements = props.postsData.map((p) => {
        return (<Post message={p.message} likesCount={p.likesCount} id={p.id} avatar={avatar}></Post>)
    })

    let newPostElement = React.createRef();

    let addPost = () => {
        let text = newPostElement.current.value;
        props.addPost(text);
        newPostElement.current.value = '';
    }

    return (
        <div className={Posts.postsBlock}>
            <h3>My posts</h3>
            <div>New Post
                <div>
                    <textarea ref={newPostElement}></textarea>
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
