import {Header} from "@/widgets/Header";
import style  from './style.module.scss'

export default function Layout({children}: { children?: React.ReactNode }) {
    return (
        <div className={style.layout}>
            <Header/>
            {children}
        </div>
    )
}