import {sendRequest} from "@/shared/api";
import {setCookie} from "@/shared/api";
import {JWT_TOKEN_COOKIE_NAME} from "@/features/Auth";

export type LoginFormDataType = {
    username: string,
    password: string,
}

export default async function login(formData: LoginFormDataType): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/token/`;
    const response = await sendRequest({url: url, type: 'POST',addToken: false, body: formData})

    if (response?.ok) {
        const data = await response.json()
        setCookie(JWT_TOKEN_COOKIE_NAME, data.access)
        return true
    } else {
        return false
    }

}