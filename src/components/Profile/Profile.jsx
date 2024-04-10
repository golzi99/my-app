import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export function Profile(props) {
    return (
        <div>
            <ProfileInfo></ProfileInfo>
            <MyPostsContainer store={props.store}></MyPostsContainer>
        </div>);
}
