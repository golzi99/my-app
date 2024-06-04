import PostModule from "./Post.module.css"
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"

type Props = {
    message: string,
    likesCount: number,
    profilePhoto: string
}

const Post: React.FC<Props> = ({message, likesCount, profilePhoto}) => {
    return (
        <div className={PostModule.item}>
            <img alt="Avatar"
                 src={profilePhoto || nonProfileImg}/>
            {message}
            <div>
                <span>Like {likesCount}</span>
            </div>
        </div>
    );
}

export default Post;