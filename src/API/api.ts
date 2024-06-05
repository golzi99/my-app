import axios, {CreateAxiosDefaults} from "axios";
import {LoginDataType, PhotosType, ProfileType, UserType} from "../types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    withCredentials: true,
    headers: {"API-KEY": "c597e703-6d67-494f-9429-342d142ce134"}
} as CreateAxiosDefaults);

type GetUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: string,
}

type FollowOrUnFollowOnUserType = {
    resultCode: ResultCodes,
    messages: Array<string>,
    data: {}
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10): Promise<GetUsersType> {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },

    followOnUserAPI(userId: number): Promise<FollowOrUnFollowOnUserType> {
        return instance.post(`/follow/${userId}`, null).then(response => response.data);
    },

    unFollowOnUserAPI(userId: number): Promise<FollowOrUnFollowOnUserType> {
        return instance.delete(`/follow/${userId}`).then(response => response.data)
    }
}

type ProfileResponseType = {
    resultCode: ResultCodes,
    messages: Array<string>,
    data: {}
}

type SavePhotosType = {
    data: PhotosType
    resultCode: ResultCodes,
    messages: Array<string>,
}

export const profileAPI = {
    getProfile(userId: number): Promise<ProfileType> {
        if (userId == null){
            return instance.get(`/profile/`);
        }
        return instance.get(`/profile/${userId}`);
    },

    getStatus(userId: number): Promise<string> {
        if (userId == null){
            return instance.get(`/profile/status`);
        }
        return instance.get(`/profile/status/${userId}`);
    },

    updateStatus(status: string): Promise<ProfileResponseType> {
        return instance.put(`/profile/status`,
            {
                status: status
            });
    },

    savePhoto(photo: any): Promise<SavePhotosType> {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            } as any
        });
    },

    saveProfile(profileData: ProfileType): Promise<ProfileResponseType> {
        if (profileData) {
            return instance.put("/profile", profileData)
        }
    }
}

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number,
        email: string,
        login: string,
    }
    resultCode: ResultCodes,
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number,
    }
    resultCode: ResultCodes | ResultCodeForCaptcha,
    messages: Array<string>
}

type LogoutResponseType = {
    data: {}
    resultCode: ResultCodes,
    messages: Array<string>
}

export const authAPI = {
    authMe(): Promise<MeResponseType> {
        return instance.get(`/auth/me`).then(response => response.data);
    },

    login(userLoginData: LoginDataType): Promise<LoginResponseType> {
        return instance.post(`/auth/login`, userLoginData).then(response => response.data);
    },

    logout(): Promise<LogoutResponseType> {
        return instance.delete(`/auth/login`).then(response => response.data);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`)
    }
}
