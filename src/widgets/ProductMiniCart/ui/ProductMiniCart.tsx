'use client'

import {ProductResponseType} from "@/features/Product";
import {getBackendFileUrl} from "@/features/Backend";
import {ProductMiniCartStyle} from '../styles'

export type ProductMiniCartPropsType = {
    item: ProductResponseType,
    onClick?: () => void,
}

export default function ProductMiniCart({item, onClick}: ProductMiniCartPropsType) {

    return (
        <div className={ProductMiniCartStyle.productMiniCart}>
            <img src={getBackendFileUrl(item.images[0])} className={ProductMiniCartStyle.img} alt=""/>
            <div className={ProductMiniCartStyle.productMiniCart}>
                <div className={ProductMiniCartStyle.main}>
                    <div className={ProductMiniCartStyle.content}>
                        <span className={ProductMiniCartStyle.label}>{item.name}</span>
                        <div className={ProductMiniCartStyle.info}>
                            <span className={ProductMiniCartStyle.description}>{item.helper_text}</span>
                            <span className={ProductMiniCartStyle.cost}>{item.price} ₽</span>
                        </div>
                    </div>
                    <button onClick={onClick} className={ProductMiniCartStyle.seeButton}>Посмотреть</button>
                </div>
            </div>
        </div>
    )
}