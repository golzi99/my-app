import {instance} from "./api.ts";

export const dialogsAPI = {
    getDialogs() {
        return instance.get(`/dialogs/`).then(response => response.data);
    },

}