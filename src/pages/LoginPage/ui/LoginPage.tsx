'use client'

import {useRef} from "react";
import {login, LoginFormDataType} from "@/features/Auth";
import {useRouter} from "next/navigation";
import {LoginPageStyle} from "@/pages/LoginPage/styles";

export default function LoginPage() {
    const formDataRef = useRef<LoginFormDataType>({} as LoginFormDataType);
    const router = useRouter();

    const onClick = async () => {
        const formData = formDataRef.current
        if (formData) {
            const response = await login(formData)

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

    return (
        <div className={LoginPageStyle.loginPage}>
            <div className={LoginPageStyle.form}>
                <span className={LoginPageStyle.label}>Вход</span>
                <div className={LoginPageStyle.inputField}>
                    <label className={LoginPageStyle.label}>Имя пользователя</label>
                    <input type={'text'} onChange={(e) => setUserName(e.target.value)}
                           className={LoginPageStyle.input}/>
                </div>
                <div className={LoginPageStyle.inputField}>
                    <label className={LoginPageStyle.label}>Пароль</label>
                    <input type={'password'} onChange={(e) => setPassword(e.target.value)}
                           className={LoginPageStyle.input}/>
                </div>
                <button onClick={onClick} className={LoginPageStyle.submitButton}>Войти</button>
                <a href={'/registration'} className={LoginPageStyle.link}>Зарегистрироваться</a>
                <a href={'/'} className={LoginPageStyle.secondLink}>Главная страница</a>
            </div>
        </div>
    )
}