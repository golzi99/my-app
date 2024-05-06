import Posts from "./MyPosts.module.css"
import {Post} from "./Post/Post";
import React from 'react';
import {PostSmtFormFormik} from "../../common/PostSmtForm/PostSmtFormFormik";

export function MyPosts(props) {
    let postsElements = props.postsData.map((p) => {
        let avatar = props.avatars.find((value) => {
            return value.id === 0;
        })
        return (<Post key={p.id} message={p.message} likesCount={p.likesCount} avatar={avatar.avatar}></Post>)
    })

    return (
        <div className={Posts.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostSmtFormFormik errors={props.errors} touched={props.touched}></PostSmtFormFormik>
            </div>
            <div className={Posts.postList}>
                {postsElements}
            </div>
        </div>);
}
