import axios, {CreateAxiosDefaults} from "axios";
import {LoginDataType, ProfileType} from "../types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    withCredentials: true,
    headers: {"API-KEY": "c597e703-6d67-494f-9429-342d142ce134"}
} as CreateAxiosDefaults);

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        });
    },

    followOnUserAPI(userId: number) {
        return instance.post(`/follow/${userId}`, null)
            .then(response => {
                return response.data;
            });
    },

    unFollowOnUserAPI(userId: number) {
        return instance.delete(`/follow/${userId}`).then(response => {
            return response.data;
        });
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        if (userId == null){
            return instance.get(`/profile/`);
        }
        return instance.get(`/profile/${userId}`);
    },

    getStatus(userId: number) {
        if (userId == null){
            return instance.get(`/profile/status`);
        }
        return instance.get(`/profile/status/${userId}`);
    },

    updateStatus(status: string) {
        return instance.put(`/profile/status`,
            {
                status: status
            });
    },

    savePhoto(photo: any) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            } as any
        });
    },

    saveProfile(profileData: ProfileType) {
        if (profileData) {
            return instance.put("/profile", profileData)
        }
    }
}

export enum ResultCodes {
    Success = 0,
    CaptchaIsRequired = 10,
}

type MeResponseType = {
    data: {
        id: number,
        email: string,
        login: string,
    }
    resultCode: number,
    messages: Array<string>
}

type LoginMeResponseType = {
    data: {
        userId: number,
    }
    resultCode: number,
    messages: Array<string>
}

type LogoutMeResponseType = {
    data: {}
    resultCode: number,
    messages: Array<string>
}

export const authAPI = {
    authMe(): Promise<MeResponseType> {
        return instance.get(`/auth/me`).then(response => response.data);
    },

    login(userLoginData: LoginDataType): Promise<LoginMeResponseType> {
        return instance.post(`/auth/login`, userLoginData).then(response => response.data);
    },

    logout(): Promise<LogoutMeResponseType> {
        return instance.delete(`/auth/login`).then(response => response.data);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`)
    }
}