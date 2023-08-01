'use client'

import React, {useState} from 'react'
import {Verse} from "@/app/lib/types/interfaces"
import Paging from "@/app/components/template/Paging/Paging"
import {formatDate} from "@/app/utils/DateUtils"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart} from "@fortawesome/free-solid-svg-icons"
import {useAppDispatch} from "@/app/hooks"
import {verseActions} from "@/app/features/slices/verse.slice"
import {library} from "@fortawesome/fontawesome-svg-core"

library.add(faHeart)

function Cards(props: { data: Verse[] | undefined }) {
    const dispatch = useAppDispatch()
    const {data} = props
    const totalSize = data == undefined ? 0 : data?.length

    const cardsPerPage = 10 // Number of posts to display per page
    const totalPages = Math.ceil(totalSize / cardsPerPage) // Total number of pages
    const [currentPage, setCurrentPage] = useState(1) // Current page state

    const getCurrentPageCards = () => {
        const startIndex = (currentPage - 1) * cardsPerPage
        const endIndex = startIndex + cardsPerPage
        return data?.slice(startIndex, endIndex)
    }

    const onChangeLike = () => {
        console.log('change like')
        if(true) {
            dispatch(verseActions.decrement())
        }else {
            dispatch(verseActions.increment())
        }
    }
    
    const onUpdate = () => {
    
    }
    
    const onDelete = () => {
    
    }

    const renderCardItems = () => {
        const currentPageCards = getCurrentPageCards()
        return currentPageCards?.map((card) => (
            <div key={card.id} className={"card-body"}>
                <div className={"card-header"}>
                    <div className={"click-btn"} onClick={onUpdate}>update</div>
                    <div className={"click-btn"} onClick={onDelete}>delete</div>
                </div>
                <p className={"verse"}>{card.verse}</p>
                <span className={"writer"}>{card.writer}</span>
                <span className={"like"}>
                    {
                        true ? (
                            <a className={"click-btn"} onClick={onChangeLike}>좋았음</a>
                        ) : (
                            <a onClick={onChangeLike}>좋음</a>
                        )
                    }
                    <span>{card.like}</span>
                </span>
                <span className={"created-at"}>{formatDate(card.createdAt)}</span>
            </div>
        ))
    }

    return (
        <div>
            <div className={"card-container"}>{renderCardItems()}</div>
            <Paging
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                itemsPerPage={cardsPerPage}
                totalItems={totalSize}
            />
        </div>
    )
}

export default Cards
