import DialogsCss from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"

export function DialogItem(props) {
    let path = `/dialogs/${props.id}`;

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
                {props.name}
            </NavLink>
        </div>);
}