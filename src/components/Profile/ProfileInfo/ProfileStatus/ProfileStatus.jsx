import React, {useEffect, useState} from "react";

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const _activateEditMode = () => {
        setEditMode(true);
    }

    const _deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const _onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {props.isOwner ?
                <div>
                    {!editMode ?
                        <div>
                            <b>Status: </b><span onDoubleClick={_activateEditMode}>{props.status || "-------------"}</span>
                        </div> :
                        <div>
                            <input onChange={_onStatusChange} autoFocus={true} onBlur={_deactivateEditMode}
                                   value={status}/>
                        </div>}
                </div>
                :
                <div>
                    <b>Status: </b><span>{props.status || "-------------"}</span>
                </div>
            }
        </div>
    );
}

export default ProfileStatus;