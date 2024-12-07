export type ProductResponseType = {
    id: number,
    tags: string[],
    images: string[],
    name: string,
    helper_text: string,
    description: string,
    price: string,
}

export type ProductListResponseType = ProductResponseType[]