import {sendRequest} from "@/shared/api";
import {ProductListResponseType} from '../types'

export default async function getProductListRequest(tag: string = ''): Promise<ProductListResponseType> {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/products/?tag=${tag}`;
    const response = await sendRequest({url: url, addToken: false})
    return response?.json()
}