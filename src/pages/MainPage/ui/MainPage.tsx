'use client'

import {MainPageStyle} from "@/pages/MainPage/styles";
import {TagsCart} from "@/widgets/TagsCart";
import {ProductLine} from "@/widgets/ProductLine";

export default function MainPage() {
    return (
        <div className={MainPageStyle.main}>
            <div className={MainPageStyle.tags}>
                <TagsCart href={'#smartphones'} label={'Смартфоны'} img={'/smartphones-tag-image.png'}/>
                <TagsCart href={'#tv'} label={'TV'} img={'/tv-tag-image.png'}/>
                <TagsCart href={'#laptop'} label={'Laptop'} img={'/laptop-tag-image.png'}/>
                <TagsCart href={'#accessories'} label={'Аксессуары'} img={'/accessories-tag-image.png'}/>
            </div>

            <ProductLine tag={'Смартфоны'} label={'Смартфоны'} id={'smartphones'}/>
            <ProductLine tag={'TV'} label={'TV'} id={'tv'}/>
            <ProductLine tag={'Laptop'} label={'Laptop'} id={'laptop'}/>
            <ProductLine tag={'Аксессуары'} label={'Аксессуары'} id={'accessories'}/>
        </div>
    )
}