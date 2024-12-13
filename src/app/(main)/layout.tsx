import {Header} from "@/widgets/Header";
import style from './style.module.scss'
import {MainLayout} from "@/pages/MainPage";

export default function Layout({children}: { children?: React.ReactNode }) {
    return (
        <MainLayout>
            <div className={style.layout}>
                <Header/>

                {children}
            </div>
        </MainLayout>
    )
}