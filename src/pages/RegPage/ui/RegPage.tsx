'use client'

import {useRef} from "react";
import {register, RegisterFormDataType} from "@/features/Auth";
import {useRouter} from "next/navigation";
import {RegPageStyle} from "../styles";

export default function RegPage() {
    const formDataRef = useRef<RegisterFormDataType>({} as RegisterFormDataType);
    const router = useRouter();

    const onClick = async () => {
        const formData = formDataRef.current
        if (formData) {
            const response = await register(formData)

            if (response) {
                router.push('/')
            }
        }
    }

    const setUserName = (value: string) => {
        formDataRef.current.username = value
    }
    const setPassword = (value: string) => {
        formDataRef.current.password = value
    }
    const setUpasswordConfirm = (value: string) => {
        formDataRef.current.password_confirm = value
    }

    return (
        <div className={RegPageStyle.regPage}>
            <div className={RegPageStyle.form}>
                <span className={RegPageStyle.label}>Вход</span>
                <div className={RegPageStyle.inputField}>
                    <label className={RegPageStyle.label}>Имя пользователя</label>
                    <input type={'text'} onChange={(e) => setUserName(e.target.value)} className={RegPageStyle.input}/>
                </div>
                <div className={RegPageStyle.inputField}>
                    <label className={RegPageStyle.label}>Пароль</label>
                    <input type={'password'} onChange={(e) => setPassword(e.target.value)}
                           className={RegPageStyle.input}/>
                </div>
                <div className={RegPageStyle.inputField}>
                    <label className={RegPageStyle.label}>Повтор пароля</label>
                    <input type={'password'} onChange={(e) => setUpasswordConfirm(e.target.value)}
                           className={RegPageStyle.input}/>
                </div>
                <button className={RegPageStyle.submitButton} onClick={onClick}>Зарегистрироваться</button>
                <a href={'/login'} className={RegPageStyle.link}>Вернутся ко входу</a>
            </div>
        </div>
    )
}