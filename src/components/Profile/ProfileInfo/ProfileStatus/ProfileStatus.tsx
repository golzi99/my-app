import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../../../redux/redux-store";
import {updateStatus} from "../../../../redux/profile-reducer.ts";

type PropsType = {
    isOwner: boolean,
}

const ProfileStatus: React.FC<PropsType> = ({isOwner}) => {
    const status = useSelector((state: AppStateType) => state.profilePage.status)

    let [editMode, setEditMode] = useState(false);
    let [localStatus, setStatus] = useState(status);

    const dispatch: AppDispatch = useDispatch();

    const _updateStatus = (status: string) => {
        dispatch(updateStatus(status))
    }

    useEffect(() => {
        setStatus(status);
    }, [status]);

    const _activateEditMode = () => {
        setEditMode(true);
    }

    const _deactivateEditMode = () => {
        setEditMode(false);
        _updateStatus(localStatus);
    }

    const _onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {isOwner ?
                <div>
                    {!editMode ?
                        <div>
                            <b>Status: </b><span onDoubleClick={_activateEditMode}>{status || "-------------"}</span>
                        </div> :
                        <div>
                            <input onChange={_onStatusChange} autoFocus={true} onBlur={_deactivateEditMode}
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