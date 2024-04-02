import PostModule from "./Post.module.css"

export function Post(props) {
    return (
        <div className={PostModule.item}>
            <img alt="Avatar"
                 src={props.avatar}/>
            {props.message}
            <div>
                <span>Like {props.likesCount}</span>
            </div>
        </div>
    );
}
