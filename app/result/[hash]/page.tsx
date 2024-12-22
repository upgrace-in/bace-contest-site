'use client'

import { useQuizContext } from "@/context/QuizContext";
import { useParams } from "next/navigation"
import { useEffect } from "react";

export default function Handler() {

    const { hash } = useParams()

    const { fetchResult } = useQuizContext();

    useEffect(() => {
        if (hash)
            fetchResult(hash)
    }, [hash])

    return (
        <h1>Display the image & adjust the items</h1>
    )
}