import {connect} from "react-redux";
import SideBar from "./SideBar.tsx";

let mapStateToProps = (state) => {
    return {
        sideBarData: state.sideBar,
    };
}

let mapDispatchToProps = () => {
    return {

    };
}

export const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(SideBar);