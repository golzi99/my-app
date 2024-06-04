import Posts from "./MyPosts.module.css"
import Post from "./Post/Post.tsx";
import React from 'react';
import PostSmtFormFormik from "../../common/PostSmtForm/PostSmtFormFormik.tsx";
import {PostDataType, ProfileType} from "../../../types/types";
import {useFormikContext} from "formik";

type Props = {
    postsData: Array<PostDataType>,
    profile: ProfileType
}

const MyPosts: React.FC<Props> = React.memo(({postsData, profile}) => {
    // window.props.push(props);
    let postsElements = postsData.map((p) => {
        return (<Post key={p.id} message={p.message} likesCount={p.likesCount}
                      profilePhoto={profile.photos.small}></Post>)
    })

    return (
        <div className={Posts.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostSmtFormFormik {...useFormikContext()}></PostSmtFormFormik>
            </div>
            <div className={Posts.postList}>
                {postsElements}
            </div>
        </div>);
});

export default MyPosts;