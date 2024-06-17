import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    status: string,
    isOwner: boolean,
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = ({status, isOwner, updateStatus}) => {
    let [editMode, setEditMode] = useState(false);
    let [localStatus, setStatus] = useState(status);

    useEffect(() => {
        setStatus(status);
    }, [status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        updateStatus(localStatus);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {isOwner ?
                <div>
                    {!editMode ?
                        <div>
                            <b>Status: </b><span onDoubleClick={activateEditMode}>{status || "-------------"}</span>
                        </div> :
                        <div>
                            <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                                   value={localStatus}/>
                        </div>}
                </div>
                :
                <div>
                    <b>Status: </b><span>{status || "-------------"}</span>
                </div>
            }
        </div>
    );
}

export default ProfileStatus;