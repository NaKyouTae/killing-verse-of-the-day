'use client';

import React, {useState} from 'react';
import {CardModel, Verse} from "@/app/lib/types/interfaces";
import Paging from "@/app/components/template/paging/Paging";
import {formatDate} from "@/app/utils/DateUtils";

function Cards(props: { data: Verse[] }) {
    const { data } = props

    const cardsPerPage = 10; // Number of posts to display per page
    const totalPages = Math.ceil(data.length / cardsPerPage); // Total number of pages
    const [currentPage, setCurrentPage] = useState(1); // Current page state

    const getCurrentPageCards = () => {
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const renderCardItems = () => {
        const currentPageCards = getCurrentPageCards();
        return currentPageCards.map((card) => (
            <div key={card.id} className={"card_body"}>
                <p className={"verse"}>{card.verse}</p>
                <span className={"writer"}>{card.writer}</span>

                <span className={"like"}>like {card.like}</span>

                <span className={"created-at"}>{formatDate(card.createdAt)}</span>
            </div>
        ));
    };

    return (
        <div>
            <div className={"card_container"}>{renderCardItems()}</div>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Paging currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
        </div>
    );
};

export default Cards;
