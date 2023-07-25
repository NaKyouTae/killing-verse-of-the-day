'use client'

import React, {useEffect, useState} from "react"
import Enter from "@/app/components/Enter/Enter"
import Cards from "@/app/components/template/Cards/Cards"
import {verseApi} from "@/app/features/apis/verse.api"
import {Verse} from "@/app/lib/types/interfaces"

function List() {
    const [verse, setVerse] = useState<Verse[]>()
    const {data, error, isLoading} = verseApi.useListQuery()
    
    useEffect(() => {
        if (data) {
            setVerse(data)
        }
    }, [data])
    
    return (
        <div className={"contents"}>
            <Enter/>
            <Cards data={verse}/>
        </div>
    )
}

export default List
