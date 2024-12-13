'use client'

import {useEffect, useState} from "react";
import {getProductDetailRequest, ProductResponseType} from "@/features/Product";
import {getBackendFileUrl} from "@/features/Backend";
import {DetailPageStyle} from '../styles'
import {addToCartRequest} from "@/features/Cart";
import {useAppSelector} from "@/store/hooks";
import {addToCart, selectCart} from "@/store/slices/CartSlice";
import useActionSlice from "@/store/useActionSlice";

export default function DetailPage({id}: { id: number }) {
    const [product, setProduct] = useState<ProductResponseType | undefined>()
    const [curImage, setCurImage] = useState<number>(0)
    const addToCartRequestAction = useActionSlice(addToCart)
    const cart = useAppSelector(selectCart)

    const isInCart = (): boolean => {
        return !!cart.find(item => item.id === id)
    }

    useEffect(() => {
        getProductDetailRequest(Number(id)).then(setProduct)
    }, [id]);

    const onAdd = async () => {
        if (product) {
            const response = await addToCartRequest(product.id)
            if (response) {
                addToCartRequestAction(product)
            }
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
                <div className={DetailPageStyle.actions}>
                    <span className={DetailPageStyle.price}>{product.price} ₽</span>
                    {isInCart() ? <div className={DetailPageStyle.inCart}>В корзине</div> :
                        <button onClick={onAdd} className={DetailPageStyle.inCartButton}>В корзину</button>}

                </div>
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
            </div>
        </div>
    ) : 'Loading...'
}