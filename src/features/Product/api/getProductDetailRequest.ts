import {sendRequest} from "@/shared/api";
import {ProductResponseType} from '../types'

export default async function getProductDetailRequest(id: number): Promise<ProductResponseType> {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/products/${id}/`;
    const response = await sendRequest({url: url, addToken: false})
    return response?.json()
}