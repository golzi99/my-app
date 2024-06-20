import axios, {CreateAxiosDefaults} from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    withCredentials: true,
    headers: {"API-KEY": "fcaa52e3-bf8e-44b8-975b-695c45dc3738"}
} as CreateAxiosDefaults);

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type ApiResponseType<D = {}, RC = ResultCodes> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}
