import {getAuthUserData} from "./auth-reducer.ts";

const INITIALIZED_SUCCESS = "samurai/app/INITIALIZED-SUCCESS";

type InitStateType = {
    initialized: boolean
}

let initState: InitStateType = {
    initialized: false,
};

const appReducer = (state = initState, action: any): InitStateType => {
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

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess());
        })
    }
}

export default appReducer;