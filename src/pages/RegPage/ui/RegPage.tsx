'use client'

import {useState} from "react";
import {register, RegisterFormDataType} from "@/features/Auth";
import {useRouter} from "next/navigation";
import {RegPageStyle} from "../styles";
import {FormBuilder} from "form-builder-npm-lib";

export default function RegPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterFormDataType>({} as RegisterFormDataType)

    const onClick = async () => {
        if (formData) {
            const response = await register(formData)

            if (response) {
                router.push('/')
            }
        }
    }

    const checkRepeatPassword = (password_confirm: string) => {
        if (password_confirm !== formData.password) {
            return 'Не совпадают пароли'
        }
        return true
    }

    return (
        <div className={RegPageStyle.regPage}>
            <div className={RegPageStyle.form}>
                <span className={RegPageStyle.label}>Вход</span>
                <FormBuilder onChange={setFormData}
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
                                 {
                                     type: 'input_field',
                                     props: {
                                         name: 'password_confirm',
                                         type: 'password',
                                         labelText: 'Повторите пароль',
                                         required: true,
                                         onBlurValidation: {required: true, fun: checkRepeatPassword},
                                     }
                                 },
                             ]}/>
                <button className={RegPageStyle.submitButton} onClick={onClick}>Зарегистрироваться</button>
                <a href={'/login'} className={RegPageStyle.link}>Вернутся ко входу</a>
            </div>
        </div>
    )
}