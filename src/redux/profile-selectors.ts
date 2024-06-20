import {AppStateType} from "./redux-store";

export const selectProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}
