import {connect} from "react-redux";
import SideBar from "./SideBar.tsx";
import {AppStateType} from "../../../redux/redux-store";

let mapStateToProps = (state : AppStateType) => {
    return {
        sideBarData: state.sideBar,
    };
}

let mapDispatchToProps = () => {
    return {

    };
}

export const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(SideBar);