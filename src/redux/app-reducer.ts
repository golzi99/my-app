import {getAuthUserData} from "./auth-reducer.ts";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = "samurai/app/INITIALIZED-SUCCESS";

type InitStateType = {
    initialized: boolean
}

let initState: InitStateType = {
    initialized: false,
};

type ActionsTypes = initializedSuccessType;

const appReducer = (state = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return {...state}
    }
}

type initializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessType => ({
    type: INITIALIZED_SUCCESS,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}

export default appReducer;