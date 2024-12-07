import {sendRequest} from "@/shared/api";
import {setCookie} from "@/shared/api";
import {JWT_TOKEN_COOKIE_NAME} from "@/features/Auth";

export type RegisterFormDataType = {
    username: string,
    password: string,
    password_confirm: string,
}

export default async function register(formData: RegisterFormDataType): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/register/`;
    const response = await sendRequest({url: url, type: 'POST', addToken: false, body: formData})

    if (response?.ok) {
        const data = await response.json()
        setCookie(JWT_TOKEN_COOKIE_NAME, data.access)
        return true
    } else {
        return false
    }

}