import {PhotosType, ProfileType} from "../types/types";
import {instance, ApiResponseType} from "./api.ts";

type SavePhotosResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number): Promise<ProfileType> {
        if (userId == null) {
            return instance.get(`/profile/`).then(response => response.data);
        }
        return instance.get(`/profile/${userId}`).then(response => response.data);
    },

    getStatus(userId: number): Promise<string> {
        if (userId == null) {
            return instance.get(`/profile/status`).then(response => response.data);
        }
        return instance.get(`/profile/status/${userId}`).then(response => response.data);
    },

    updateStatus(status: string): Promise<ApiResponseType> {
        return instance.put(`/profile/status`,
            {
                status: status
            }).then(response => response.data);
    },

    savePhoto(photo: any): Promise<ApiResponseType<SavePhotosResponseDataType>> {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            } as any
        }).then(response => response.data);
    },

    saveProfile(profileData: ProfileType): Promise<ApiResponseType> {
        if (profileData) {
            return instance.put("/profile", profileData).then(response => response.data)
        }
    }
}