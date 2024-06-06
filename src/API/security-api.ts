import {instance} from "./api.ts";

type GetCaptchaUrlType = {
    url: string;
}

export const securityAPI = {
    getCaptchaUrl(): Promise<GetCaptchaUrlType> {
        return instance.get(`/security/get-captcha-url`).then(response => response.data)
    }
}