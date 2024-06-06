import {getAuthUserData} from "./auth-reducer.ts";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";

let initState = {
    initialized: false,
};

type InitStateType = typeof initState;

const appReducer = (state = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "samurai/app/INITIALIZED-SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return {...state}
    }
}

type ActionsTypes = InferActionsType<typeof appActions>;

export const appActions = {
    initializedSuccess: () => ({
        type: "samurai/app/INITIALIZED-SUCCESS"
    } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(appActions.initializedSuccess());
    })
}

export default appReducer;