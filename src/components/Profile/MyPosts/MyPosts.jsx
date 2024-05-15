import Posts from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import React from 'react';
import {PostSmtFormFormik} from "../../common/PostSmtForm/PostSmtFormFormik";

// window.props = [];

export const MyPosts = React.memo(props => {

    // window.props.push(props);
    let postsElements = props.postsData.map((p) => {
        return (<Post key={p.id} message={p.message} likesCount={p.likesCount}></Post>)
    })

    return (
        <div className={Posts.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostSmtFormFormik></PostSmtFormFormik>
            </div>
            <div className={Posts.postList}>
                {postsElements}
            </div>
        </div>);
});
