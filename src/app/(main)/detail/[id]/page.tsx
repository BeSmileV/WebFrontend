import {DetailPage} from "@/pages/DetailPage";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    return <DetailPage id={Number(id)}/>
}