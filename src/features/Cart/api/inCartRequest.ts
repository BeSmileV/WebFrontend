import {sendRequest} from "@/shared/api";

export default async function inCartRequest(productId: number): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/cart/in_cart/`;
    const response = await sendRequest({
        url: url,
        type: 'POST',
        body: {
            product_id: productId,
        }
    })
    const data = await response?.json()
    return !!response?.ok && data.success
}