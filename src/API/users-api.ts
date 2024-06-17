import {instance, ApiResponseType} from "./api.ts";
import {UserType} from "../types/types";

type GetUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: string,
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null): Promise<GetUsersType> {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend == null ? "" : `&friend=${friend}`)).then(response => response.data)
    },

    followOnUserAPI(userId: number): Promise<ApiResponseType> {
        return instance.post(`/follow/${userId}`, null).then(response => response.data);
    },

    unFollowOnUserAPI(userId: number): Promise<ApiResponseType> {
        return instance.delete(`/follow/${userId}`).then(response => response.data)
    }
}