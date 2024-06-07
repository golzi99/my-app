import {getAuthUserData} from "./auth-reducer.ts";
import {BaseThunkType, InferActionsType} from "./redux-store";

let initState = {
    initialized: false,
};

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

export const appActions = {
    initializedSuccess: () => ({
        type: "samurai/app/INITIALIZED-SUCCESS"
    } as const),
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(appActions.initializedSuccess());
    })
}

export default appReducer;

type InitStateType = typeof initState;
type ActionsTypes = InferActionsType<typeof appActions>;
type ThunkType = BaseThunkType<ActionsTypes>;
