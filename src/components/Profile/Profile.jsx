import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export function Profile(props) {
    return (
        <div>
            <ProfileInfo></ProfileInfo>
            <MyPosts postsData={props.posts.postsData} avatar={props.posts.avatar} addPost={props.addPost}></MyPosts>
        </div>);
}
