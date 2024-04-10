import {connect} from "react-redux";
import {SideBar} from "./SideBar";

let mapStateToProps = (state) => {
    return {
        avatars: state.avatars.avatarsStore,
        sideBarData: state.sideBar,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {

    };
}

export const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(SideBar);