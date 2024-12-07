'use client'

import {useParams} from "next/navigation";
import {DetailPage} from "@/pages/DetailPage";
import {useEffect, useState} from "react";
import getProductDetailRequest from "../../../features/Product/api/getProductDetailRequest";
import {ProductResponseType} from "@/features/Product";

export default function Page() {
    const {id} = useParams()

    return <DetailPage id={Number(id)}/>
}