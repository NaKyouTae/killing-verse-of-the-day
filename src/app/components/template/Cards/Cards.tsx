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

function Cards(props: { data: Verse[] }) {
    const dispatch = useAppDispatch()
    const {data} = props

    const cardsPerPage = 10 // Number of posts to display per page
    const totalPages = Math.ceil(data.length / cardsPerPage) // Total number of pages
    const [currentPage, setCurrentPage] = useState(1) // Current page state

    const getCurrentPageCards = () => {
        const startIndex = (currentPage - 1) * cardsPerPage
        const endIndex = startIndex + cardsPerPage
        return data.slice(startIndex, endIndex)
    }

    const onChangeLike = () => {
        console.log('change like')
        if(true) {
            dispatch(verseActions.decrement())
        }else {
            dispatch(verseActions.increment())
        }
    }

    const renderCardItems = () => {
        const currentPageCards = getCurrentPageCards()
        return currentPageCards.map((card) => (
            <div key={card.id} className={"card_body"}>
                <p className={"verse"}>{card.verse}</p>
                <span className={"writer"}>{card.writer}</span>
                <span className={"like"}>
                    {
                        true ? (
                            <a onClick={onChangeLike}>
                                <FontAwesomeIcon icon={faHeart} size={"2xl"} color={"red"} />
                            </a>
                        ) : (
                            <a onClick={onChangeLike}>
                                <FontAwesomeIcon icon={faHeart} size={"2xl"} />
                            </a>
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
            <div className={"card_container"}>{renderCardItems()}</div>
            <Paging
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                itemsPerPage={cardsPerPage}
                totalItems={data.length}
            />
        </div>
    )
}

export default Cards
