'use client'

import {useCookies} from "next-client-cookies";
import {JWT_TOKEN_COOKIE_NAME} from "@/features/Auth";
import {Logout01SVG, ShopingCart01SVG, UserSquareSVG} from "@/shared/assets";
import {HeaderStyle} from "@/widgets/Header/styles";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {CartWindow} from "@/widgets/CartWindow";

export default function Header() {
    const cookies = useCookies();
    const router = useRouter()

    const [isShowCart, setIsShowCart] = useState<boolean>(false)
    const modalWindowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onWindowMouseDown = (e: MouseEvent) => {
            const modalWindow = modalWindowRef.current
            if (e.target !== modalWindow && !modalWindow?.contains(e.target as Node)) {
                setIsShowCart(false)
            }
        }

        addEventListener('mousedown', onWindowMouseDown)
        return () => {
            removeEventListener('mousedown', onWindowMouseDown)
        }
    }, [])

    const onLogin = () => {
        router.push('/login');
    }

    const onLogout = () => {
        cookies.remove(JWT_TOKEN_COOKIE_NAME)
    }

    const isLogin: boolean = !!cookies.get(JWT_TOKEN_COOKIE_NAME)

    return (
        <div className={HeaderStyle.header}>
            <button onClick={() => router.push('/')} className={HeaderStyle.logo}>LOGO</button>
            <div className={HeaderStyle.actions}>
                <button onClick={() => setIsShowCart(prevState => !prevState)} className={HeaderStyle.iconButton}>
                    <ShopingCart01SVG/></button>
                {isShowCart && (
                    <div className={HeaderStyle.modalWindow} ref={modalWindowRef}>
                        <CartWindow/>
                    </div>
                )}
                <button onClick={isLogin ? onLogout : onLogin} className={HeaderStyle.iconButton}>
                    {isLogin ? <Logout01SVG/> : <UserSquareSVG/>}
                </button>
            </div>
        </div>
    )
}