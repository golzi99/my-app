import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export function Profile(props) {
    return (
        <div>
            <ProfileInfo profile={props.profile}></ProfileInfo>
            <MyPostsContainer></MyPostsContainer>
        </div>);
}
