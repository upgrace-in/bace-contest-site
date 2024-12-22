'use client'

import { useQuizContext } from "@/context/QuizContext";
import { useParams } from "next/navigation"
import { useEffect } from "react";

export default function Handler() {

    const { hash } = useParams()

    const { fetchResult, result } = useQuizContext();

    useEffect(() => {
        if (hash)
            fetchResult(hash)
    }, [hash])

    useEffect(() => {
        if (result)
            console.log(result)
    }, [result])

    return (
        <>
            <h1>Display the image & adjust the items</h1>
            {JSON.stringify(result) || ''}
        </>
    )
}