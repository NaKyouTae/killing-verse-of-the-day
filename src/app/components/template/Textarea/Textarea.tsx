'use client';

// @ts-ignore
import {useState} from "react";
import {verseActions} from "@/app/features/slices/verse.slice";
import {useAppDispatch} from "@/app/hooks";

function Textarea(props: { summit: any }) {
    const dispatch = useAppDispatch()
    const [verse, setVerse] = useState()

    const handlerChange = (e: any) => {
        const newVerse = e.target.value
        setVerse(newVerse)
        dispatch(verseActions.setVerse(newVerse))
    }

    return (
        <div className={"textarea-container"}>
            <textarea onChange={(e: any) => handlerChange(e)}/>
            <button className={"primary-button"} onClick={props.summit}>응원</button>
        </div>
    );
};

export default Textarea;
