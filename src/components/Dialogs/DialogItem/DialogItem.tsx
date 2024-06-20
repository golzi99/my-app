import DialogsCss from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";
import nonProfileImg from "../../../assets/img/noProfilePictureIcon.png"

type PropsType = {
    id: number
    name: string,
}

const DialogItem: React.FC<PropsType> = ({id, name}) => {
    let path = `/dialogs/${id}`;

    const SelectedLink = () => {
        return (
            select => select.isActive ? DialogsCss.active : DialogsCss.item
        );
    }

    return (
        <div className={`${DialogsCss.item}`}>
            <NavLink to={path} className={SelectedLink()}>
                <img
                    alt="Avatar"
                    src={nonProfileImg}/>
                {name}
            </NavLink>
        </div>);
}

export default DialogItem;