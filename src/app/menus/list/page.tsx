'use client'

import React, {useEffect, useState} from "react"
import Enter from "@/app/components/Enter/Enter"
import Cards from "@/app/components/template/Cards/Cards"
import {verseApi} from "@/app/features/apis/verse.api"
import {Verse} from "@/app/lib/types/interfaces"
import {useAppSelector} from "@/app/hooks"
import {verseListRqDefaultParam} from "@/app/lib/types/model"
import {selectVerses} from "@/app/features/slices/verse-list.slice"

function List() {
    const [verse, setVerse] = useState<Verse[]>()
    const {data, error, isLoading} = verseApi.useListQuery(verseListRqDefaultParam)
    
    const selectorVerse = useAppSelector(selectVerses)
    
    useEffect(() => {
        if (data) {
            setVerse(data)
        }
    }, [data])
    
    useEffect(() => {
        if (selectorVerse) {
            setVerse(selectorVerse)
        }
    }, [selectorVerse])
    
    return (
        <div className={"contents"}>
            <Enter/>
            <Cards data={verse}/>
        </div>
    )
}

export default List
