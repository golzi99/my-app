import {LoginDataType} from "../types/types";
import {instance, ApiResponseType, ResultCodeForCaptcha, ResultCodes} from "./api.ts";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string,
}

type LoginOrLogoutResponseType = {
    userId: number,
}

export const authAPI = {
    authMe(): Promise<ApiResponseType<MeResponseDataType>> {
        return instance.get(`/auth/me`).then(response => response.data);
    },

    login(userLoginData: LoginDataType): Promise<ApiResponseType<LoginOrLogoutResponseType, ResultCodes | ResultCodeForCaptcha>> {
        return instance.post(`/auth/login`, userLoginData).then(response => response.data);
    },

    logout(): Promise<ApiResponseType<LoginOrLogoutResponseType>> {
        return instance.delete(`/auth/login`).then(response => response.data);
    }
}