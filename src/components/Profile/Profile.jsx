import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export function Profile(props) {
    return (
        <div>
            <ProfileInfo></ProfileInfo>
            <MyPosts postsData={props.profilePage.postsData} newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
                     avatars={props.avatars}></MyPosts>
        </div>);
}
