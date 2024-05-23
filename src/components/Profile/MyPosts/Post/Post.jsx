import PostModule from "./Post.module.css"
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"

export function Post(props) {
    return (
        <div className={PostModule.item}>
            <img alt="Avatar"
                 src={nonProfileImg}/>
            {props.message}
            <div>
                <span>Like {props.likesCount}</span>
            </div>
        </div>
    );
}
