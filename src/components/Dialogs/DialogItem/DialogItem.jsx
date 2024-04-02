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
                    src={props.avatar}/>
                {props.name}
            </NavLink>
        </div>);
}