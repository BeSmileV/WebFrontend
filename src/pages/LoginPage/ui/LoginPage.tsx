'use client'

import {useRef} from "react";
import {login, LoginFormDataType} from "@/features/Auth";
import {useRouter} from "next/navigation";
import {LoginPageStyle} from "@/pages/LoginPage/styles";
import {FormBuilder} from "form-builder-npm-lib";

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

    return (
        <div className={LoginPageStyle.loginPage}>
            <div className={LoginPageStyle.form}>
                <span className={LoginPageStyle.label}>Вход</span>
                <FormBuilder onChange={(data: LoginFormDataType) => formDataRef.current = data}
                             schema={[
                                 {
                                     type: 'input_field',
                                     props: {
                                         name: 'username',
                                         type: 'text',
                                         labelText: 'Имя пользователя',
                                         required: true,
                                         onBlurValidation: {required: true},
                                     }
                                 },
                                 {
                                     type: 'input_field',
                                     props: {
                                         name: 'password',
                                         type: 'password',
                                         labelText: 'Пароль',
                                         required: true,
                                         onBlurValidation: {required: true},
                                     }
                                 },
                             ]}/>
                <button onClick={onClick} className={LoginPageStyle.submitButton}>Войти</button>
                <a href={'/registration'} className={LoginPageStyle.link}>Зарегистрироваться</a>
                <a href={'/'} className={LoginPageStyle.secondLink}>Главная страница</a>
            </div>
        </div>
    )
}