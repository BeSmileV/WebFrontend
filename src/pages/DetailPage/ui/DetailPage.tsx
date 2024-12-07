'use client'

import {useEffect, useState} from "react";
import {getProductDetailRequest, ProductResponseType} from "@/features/Product";
import {getBackendFileUrl} from "@/features/Backend";
import {DetailPageStyle} from '../styles'
import {addToCartRequest} from "@/features/Cart";

export default function DetailPage({id}: { id: number }) {
    const [product, setProduct] = useState<ProductResponseType | undefined>()
    const [curImage, setCurImage] = useState<number>(0)

    useEffect(() => {
        getProductDetailRequest(Number(id)).then(setProduct)
    }, [id]);

    const onAdd = async () => {
        if (product) {
            const repsonse = await addToCartRequest(product.id)
        }
    }

    return product ? (
        <div className={DetailPageStyle.detailPage}>
            <div className={DetailPageStyle.imageBlock}>
                <img src={getBackendFileUrl(product.images[curImage])} className={DetailPageStyle.curImage}/>
                <div className={DetailPageStyle.imageList}>
                    {product.images.map((item, idx) => <img src={getBackendFileUrl(item)}
                                                            onClick={() => setCurImage(idx)}
                                                            key={idx}
                                                            className={DetailPageStyle.item}/>)}
                </div>
            </div>
            <div className={DetailPageStyle.infoBlock}>
                <span className={DetailPageStyle.name}>{product.name}</span>
                <span className={DetailPageStyle.price}>{product.price} ₽</span>
                <div className={DetailPageStyle.tagsList}>
                    <span className={DetailPageStyle.label}>Теги</span>
                    <div className={DetailPageStyle.list}>
                        {product.tags.map((item, idx) => <div className={DetailPageStyle.tag} key={idx}>{item}</div>)}
                    </div>
                </div>
                <div className={DetailPageStyle.description}>
                    <span className={DetailPageStyle.label}>Описание</span>
                    <div className={DetailPageStyle.text}>{product.description}</div>
                </div>
                <button onClick={onAdd} className={DetailPageStyle.inCartButton}>В корзину</button>
            </div>
        </div>
    ) : 'Loading...'
}