'use client'

import Textarea from "@/app/components/template/Textarea/Textarea"
import {useAppDispatch, useAppSelector} from "@/app/hooks"
import {useEffect} from "react"
import {verseApi} from "@/app/features/apis/verse.api"
import {Verse} from "@/app/lib/types/interfaces"
import {VerseRequest} from "@/app/lib/types/requests"

function Enter() {
    const dispatch = useAppDispatch()
    const [insertTrigger, insertResult] = verseApi.useLazyInsertVerseQuery()
    const enterVerse = useAppSelector((state) => state.verse.verse)

    const summit = () => {
        // create api
        
        const body: VerseRequest = {
            id: null,
            verse: 'test',
            writer: 'nakyutae',
            like: null,
            createdAt: null,
            updatedAt: null,
        }
        
        console.log('body', body)
        
        insertTrigger(body)
            .unwrap()
            .then((res: any) => {
                console.log('insert', res)
            })
            .catch((err: any) => {
                alert(err.message)
            })
    }

    useEffect(() => {
    }, [enterVerse])

    return (
        <div className={"input-form"}>
            <Textarea summit={summit}/>
        </div>
    )
}

export default Enter
