import {CartWindowStyle} from "../styles";
import {useEffect, useState} from "react";
import {CartType} from "@/features/Cart/api/getCartRequest";
import {getCartRequest, removeFromCartRequest} from "@/features/Cart";
import {ProductResponseType} from "@/features/Product";
import {CheckSVG, XCloseSVG} from "@/shared/assets";
import {getBackendFileUrl} from "@/features/Backend";
import buyRequest from "@/features/Cart/api/buyRequest";

export default function CartWindow() {
    const [cart, setCart] = useState<CartType | 'success_buy' | null | undefined>(undefined)

    useEffect(() => {
        getCartRequest().then(setCart)
    }, []);

    const removeProduct = async (productId?: number) => {
        if (productId) {
            const response = await removeFromCartRequest(productId)
            if (response) {
                setCart(prevState => {
                    if (!prevState || prevState === 'success_buy')
                        return prevState
                    const newState = {...prevState}
                    newState.products = newState.products?.filter(item => item.id !== productId)
                    return newState
                })
            }
        }
    }

    const buyProducts = async () => {
        const response = await buyRequest()

        if (response) {
            setCart('success_buy')
        }
    }

    const CartCard = ({item}: { item: ProductResponseType }) => {
        return (
            <div className={CartWindowStyle.cartCard}>
                <img src={getBackendFileUrl(item.images[0])} className={CartWindowStyle.img}/>
                <div className={CartWindowStyle.info}>
                    <span className={CartWindowStyle.name}>{item.name}</span>
                    <span className={CartWindowStyle.helperText}>{item.helper_text}</span>
                </div>
                <span className={CartWindowStyle.price}>{item.price} ₽</span>
                <button onClick={() => removeProduct(item.id)} className={CartWindowStyle.deleteButton}><XCloseSVG/>
                </button>
            </div>
        )
    }

    const getContent = () => {
        switch (cart) {
            case undefined:
                return 'Loading...'
            case null:
                return <a href={'/login'} className={CartWindowStyle.loginLink}>Войти</a>
            case 'success_buy':
                return <div className={CartWindowStyle.success}><CheckSVG/></div>
            default:
                return (
                    <>
                        {cart.products.map((item, idx) => <CartCard item={item} key={idx}/>)}
                        <button onClick={buyProducts} className={CartWindowStyle.loginLink}>Купить</button>
                    </>
                )

        }
    }

    return (
        <div className={CartWindowStyle.cartWindow}>
            {getContent()}
        </div>
    )
}