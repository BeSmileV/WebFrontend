'use client'

import useActionSlice from "@/store/useActionSlice";
import {setCart} from "@/store/slices/CartSlice";
import {useCookies} from "next-client-cookies";
import {useEffect} from "react";
import {JWT_TOKEN_COOKIE_NAME} from "@/features/Auth";
import {getCartRequest} from "@/features/Cart";

export default function MainLayout({children}: { children?: React.ReactNode }) {
    const setCartAction = useActionSlice(setCart)
    const cookies = useCookies()

    useEffect(() => {
        const tryGetCart = async () => {
            const jwt = cookies.get(JWT_TOKEN_COOKIE_NAME)
            if (jwt) {
                const response = await getCartRequest()
                if (response !== null) {
                    setCartAction(response.products)
                }
            }
        }
        tryGetCart()
    }, [cookies.get(JWT_TOKEN_COOKIE_NAME)]);

    return (
        <>{children}</>
    )
}