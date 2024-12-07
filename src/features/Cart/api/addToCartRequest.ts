import {sendRequest} from "@/shared/api";

export default async function addToCartRequest(productId: number): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/cart/`;
    const response = await sendRequest({
        url: url,
        type: 'POST',
        body: {
            product_id: productId,
        }
    })
    return !!response?.ok
}