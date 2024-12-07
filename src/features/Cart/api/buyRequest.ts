import {sendRequest} from "@/shared/api";

export default async function buyRequest(): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/cart/buy/`;
    const response = await sendRequest({
        url: url,
        type: 'POST',
    })
    return !!response?.ok
}