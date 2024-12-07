import {TagsCartPropsType} from "../types";
import {TagsCartStyle} from "@/widgets/TagsCart/styles";

export default function TagsCart({label, img, href}: TagsCartPropsType) {
    return (
        <a href={href} className={TagsCartStyle.tagsCart}>
            <img src={img} className={TagsCartStyle.image}/>
            <span className={TagsCartStyle.label}>{label}</span>
        </a>
    )
}