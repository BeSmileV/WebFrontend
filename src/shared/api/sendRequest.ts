'use client'

import {getCookie} from "@/shared/api";
import {JWT_TOKEN_COOKIE_NAME} from "@/features/Auth";

type ContentType = 'form-data' | 'multipart' | 'json'

export type SendRequestPropsType = {
    url: string,
    type?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    header?: { [key: string]: string },
    body?: any,
    addToken?: boolean,
    contentType?: ContentType,
}

const getContentTypeHeader = (type: ContentType) => {
    switch (type) {
        case 'form-data':
            return {'Content-Type': 'application/x-www-form-urlencoded'}
        case 'multipart':
            return {}
        case 'json':
            return {'Content-Type': 'application/json'}
        default:
            return
    }
}

export default async function sendRequest({
                                              url,
                                              body,
                                              header = {},
                                              addToken = true,
                                              type = 'GET',
                                              contentType = 'json',
                                          }: SendRequestPropsType): Promise<Response | null> {
    const token = getCookie(JWT_TOKEN_COOKIE_NAME)
    try {
        const response = await fetch(url, {
            method: type,
            headers: {
                ...header,
                ...(addToken ? {'Authorization': `Bearer ${token}`,} : {}),
                ...getContentTypeHeader(contentType),
            } as { [key: string]: string },
            body: contentType === 'json' ? JSON.stringify(body) : body,
        })
        return response
    } catch (error) {
        return null
    }
}