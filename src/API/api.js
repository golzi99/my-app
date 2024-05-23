import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "fe4b4e7c-4f82-4984-ac76-d63b2448cf40"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        });
    },

    followOnUserAPI(userId) {
        return instance.post(`/follow/${userId}`, null)
            .then(response => {
                return response.data;
            });
    },

    unFollowOnUserAPI(userId) {
        return instance.delete(`/follow/${userId}`).then(response => {
            return response.data;
        });
    }
}

export const profileAPI = {
    getProfile(userId) {
        if (userId == null){
            return instance.get(`/profile/`);
        }
        return instance.get(`/profile/${userId}`);
    },

    getStatus(userId) {
        if (userId == null){
            return instance.get(`/profile/status`);
        }
        return instance.get(`/profile/status/${userId}`);
    },

    updateStatus(status) {
        return instance.put(`/profile/status`,
            {
                status: status
            });
    },

    savePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        });
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`/auth/me`)
            .then(response => {
                return response.data;
            });
    },

    login(userLoginData) {
        return instance.post(`/auth/login`, userLoginData).then(response => {
            return response.data;
        });
    },

    logout() {
        return instance.delete(`/auth/login`).then(response => {
            return response.data;
        })
    }
}