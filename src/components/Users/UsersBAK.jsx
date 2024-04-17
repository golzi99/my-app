import UsersCss from "./UsersCss.module.css"
import axios from "axios";

export function UsersBAK(props) {

    let getUsers = () => {
        if (props.users.length === 0){

            axios.get(`https://social-network.samuraijs.com/api/1.0/users`).then(r => {
                props.setUsers(r.data.items);
            });
        }
    };

    const lastDigit = (num) => {
        return num % 10;
    };

    return (
        <div>
            <button onClick={getUsers}>GET USERS</button>
            {
                props.users.map(u => {
                    let avatar = props.avatars.find((value) => {
                        if (u.photos.small === null) {
                            return value.id === lastDigit(u.id);
                        }
                        else{
                            return u.photos.small; // check it in the further
                        }

                    });

                    return (<div key={u.id} className={UsersCss.userList}>
                        <span>
                            <div>
                                <img alt="avatar" src={avatar.avatar}/>
                            </div>
                            <dix>
                                {u.followed ? <button onClick={() => {
                                        props.unFollowOnUser(u.id);
                                    }}>Unfollow</button> :
                                    <button onClick={() => {
                                        props.followOnUser(u.id);
                                    }}>Follow</button>}
                            </dix>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"}</div>
                            </span>
                        </span>
                    </div>)
                })
            }
        </div>
    );
}