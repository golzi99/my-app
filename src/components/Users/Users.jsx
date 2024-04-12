import UsersCss from "./UsersCss.module.css"

export function Users(props) {
    if (props.users.length === 0){
        props.setUsers([
            {
                id: 0,
                followed: false,
                fullName: "Dmitry",
                location: {city: "Minsk", country: "Belarus"},
                status: "I am Batman"
            },
            {
                id: 1,
                followed: false,
                fullName: "Svetlana",
                location: {city: "Minsk", country: "Belarus"},
                status: "Pretty girl"
            },
            {
                id: 2,
                followed: true,
                fullName: "Sergei",
                location: {city: "Moscow", country: "Russia"},
                status: "I like football !!!"
            },
            {
                id: 3,
                followed: true,
                fullName: "Andrew",
                location: {city: "New-York", country: "USA"},
                status: "if you need help with video, text me"
            },
        ]);
    }

    return (
        <div>
            {
                props.users.map(u => {
                    let avatar = props.avatars.find((value) => {
                        return value.id === u.id;
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
                                <div>{u.fullName}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{u.location.country}</div>
                                <div>{u.location.city}</div>
                            </span>
                        </span>
                    </div>)
                })
            }
        </div>
    );
}