import {sendRequest} from "@/shared/api";
import {ProductResponseType} from "@/features/Product";

export type CartType = {
    id: number,
    products: ProductResponseType[]
}

export default async function getCartRequest(): Promise<CartType | null> {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/cart/`;
    const response = await sendRequest({
        url: url,
        type: 'GET',
    })
    if (response?.ok) {
        return await response.json()
    } else {
        return null
    }
}