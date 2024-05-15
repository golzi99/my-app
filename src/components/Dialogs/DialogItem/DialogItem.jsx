import DialogsCss from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

export function DialogItem(props) {
    let path = `/Dialogs/${props.id}`;

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
                    src={`/img/no-profile-picture-icon.png`}/>
                {props.name}
            </NavLink>
        </div>);
}