'use client'

import Textarea from "@/app/components/template/Textarea/Textarea"
import {useAppDispatch, useAppSelector} from "@/app/hooks"
import {verseApi} from "@/app/features/apis/verse.api"
import {VerseInsertRequest} from "@/app/lib/types/requests"
import {verseDefaultRequestParam, verseListRqDefaultParam} from "@/app/lib/types/model"
import {verseActions} from "@/app/features/slices/verse.slice"
import {verseListActions} from "@/app/features/slices/verse-list.slice"

function Enter() {
    const dispatch = useAppDispatch()
    const [listTrigger, listResult] = verseApi.useLazyListQuery()
    const [insertTrigger, insertResult] = verseApi.useLazyInsertQuery()
    const enterVerse = useAppSelector((state) => state.verse.verse)
    
    const summit = () => {
        const body: VerseInsertRequest = {
            ...verseDefaultRequestParam,
            verse: enterVerse,
            // FIXME: 실제 사용자 이름으로 변경
            writer: 'nakyutae',
        }
        
        insertTrigger(body)
            .unwrap()
            .then((res: any) => {
                resetList()
            })
            .catch((err: any) => {
                console.log(err.message)
            })
    }
    
    const resetList = () => {
        listTrigger(verseListRqDefaultParam)
            .unwrap()
            .then((list: any) => {
                dispatch(verseListActions.changeResponse(list))
                dispatch(verseActions.setVerse(""))
            })
    }
    
    return (
        <div className={"input-form"}>
            <Textarea summit={summit}/>
        </div>
    )
}

export default Enter
