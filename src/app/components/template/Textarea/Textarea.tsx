'use client';

// @ts-ignore
import {useEffect, useState} from "react"
import {selectVerse, verseActions} from "@/app/features/slices/verse.slice"
import {useAppDispatch, useAppSelector} from "@/app/hooks"
import {setEngine} from "crypto"

function Textarea(props: { summit: any }) {
    const dispatch = useAppDispatch()
    const [verse, setVerse] = useState<string>()
    const selectorVerse = useAppSelector(selectVerse)

    const handlerChange = (e: any) => {
        const newVerse = e.target.value
        setVerse(newVerse)
        dispatch(verseActions.setVerse(newVerse))
    }
    
    useEffect(() => {
        setVerse(selectorVerse)
    }, [selectorVerse])

    return (
        <div className={"textarea-container"}>
            <textarea value={verse} onChange={(e: any) => handlerChange(e)}/>
            <button className={"primary-button"} onClick={props.summit}>응원</button>
        </div>
    );
};

export default Textarea;
