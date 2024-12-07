'use client'

import {ProductLinePropsType} from "@/widgets/ProductLine/types";
import {ProductMiniCart} from "@/widgets/ProductMiniCart";
import {useEffect, useState} from "react";
import {getProductListRequest, ProductListResponseType} from "@/features/Product";
import {ProductLineStyle} from "@/widgets/ProductLine/styles";
import {useRouter} from "next/navigation";

export default function ProductLine({label, tag, id}: ProductLinePropsType) {
    const [products, setProducts] = useState<ProductListResponseType>([])
    const router = useRouter()

    useEffect(() => {
        getProductListRequest(tag).then(data => {
            setProducts(data)
        })
    }, []);

    return products && products.length > 0 && (
        <div id={id} className={ProductLineStyle.productLine}>
            <span className={ProductLineStyle.label}>{label}</span>
            <div className={ProductLineStyle.list}>
                {products.map((item, idx) => <ProductMiniCart item={item}
                                                              onClick={() => router.push(`/detail/${item.id}`)}
                                                              key={idx}/>)}
            </div>
        </div>
    )
}