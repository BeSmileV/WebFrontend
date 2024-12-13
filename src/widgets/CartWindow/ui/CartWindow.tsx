import {CartWindowStyle} from "../styles";
import {useState} from "react";
import {removeFromCartRequest} from "@/features/Cart";
import {ProductListResponseType, ProductResponseType} from "@/features/Product";
import {CheckSVG, XCloseSVG} from "@/shared/assets";
import {getBackendFileUrl} from "@/features/Backend";
import buyRequest from "@/features/Cart/api/buyRequest";
import {useAppSelector} from "@/store/hooks";
import {clearCart, deleteFromCart, selectCart} from "@/store/slices/CartSlice";
import useActionSlice from "@/store/useActionSlice";
import {useCookies} from "next-client-cookies";
import {JWT_TOKEN_COOKIE_NAME} from "@/features/Auth";

export default function CartWindow() {
    const cart: ProductListResponseType = useAppSelector(selectCart)
    const deleteFromCartAction = useActionSlice(deleteFromCart)
    const clearCartAction = useActionSlice(clearCart)
    const [successBuy, setSuccessBuy] = useState<boolean>(false)

    const cookies = useCookies()
    const removeProduct = async (productId?: number) => {
        if (productId) {
            const response = await removeFromCartRequest(productId)
            if (response) {
                deleteFromCartAction(productId)
            }
        }
    }

    const buyProducts = async () => {
        const response = await buyRequest()

        if (response) {
            setSuccessBuy(true)
            clearCartAction()
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
        if (!cookies.get(JWT_TOKEN_COOKIE_NAME))
            return <a href={'/login'} className={CartWindowStyle.loginLink}>Войти</a>

        if (successBuy)
            return <div className={CartWindowStyle.success}><CheckSVG/></div>

        return (
            <>
                {cart.map((item, idx) => <CartCard item={item} key={idx}/>)}
                {cart.length > 0 ?
                    <button onClick={buyProducts} className={CartWindowStyle.loginLink}>Купить</button> :
                    <span className={CartWindowStyle.chooseProduct}>Выберите товары</span>}
            </>
        )
    }

    return (
        <div className={CartWindowStyle.cartWindow}>
            {getContent()}
        </div>
    )
}