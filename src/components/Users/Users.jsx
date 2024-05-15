import UsersCss from "./UsersCss.module.css"
import React from "react";
import {NavLink} from "react-router-dom";

function Users(props) {

    let pages = [];
    for (let i = 1; i <= props.pagesCount(); i++) {
        pages.push(i);
    }

    let slicedPages;
    let curPage = props.currentPage;
    if (curPage - 3 < 0) {
        slicedPages = pages.slice(0, 5);
    } else {
        slicedPages = pages.slice(curPage - 3, curPage + 2);
    }

    return (
        <div>
            <div className={UsersCss.pageString}>
                {slicedPages.map((p) => {
                    return (<span className={props.currentPage === p ? UsersCss.selectedPage : UsersCss.page}
                                  key={p.id}
                                  onClick={() => {
                                      props.onPageChanged(p)
                                  }}>{p}</span>);
                })}
            </div>
            {
                props.users.map(u => {
                    return (<div key={u.id} className={UsersCss.userList}>
                        <span>
                            <div>
                                <NavLink to={`/ProfileInfo/${u.id}`}>
                                    <img alt="avatar" src={`/img/no-profile-picture-icon.png`}/>
                                </NavLink>
                            </div>
                            <div>
                                {u.followed ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                      onClick={() => {
                                                          props.unFollow(u.id);
                                                      }
                                                      }>Unfollow</button> :
                                    <button disabled={props.followingInProgress.some(id => id === u.id)}
                                            onClick={() => {
                                                props.follow(u.id);
                                            }
                                            }>Follow</button>}
                            </div>
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

export default Users;