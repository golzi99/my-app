import PostModule from "./Post.module.css"

export function Post(props) {
    return (
        <div className={PostModule.item}>
            <img alt="Avatar"
                 src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1319243779.1711497600&semt=sph"/>
            {props.message}
            <div>
                <span>Like {props.likesCount}</span>
                <span> Dislike</span>
            </div>
        </div>
    );
}
