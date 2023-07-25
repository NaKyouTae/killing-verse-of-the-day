function Paging(props: { currentPage: number, totalPages: number, totalItems: number, itemsPerPage: number, setCurrentPage: any}) {
    const { currentPage, totalPages, totalItems, itemsPerPage, setCurrentPage } = props
    const currentItemRangeFrom = ((currentPage - 1) * itemsPerPage) + 1;
    const currentItemRangeTo = Math.min(currentItemRangeFrom + itemsPerPage - 1, totalItems);

    // Render the page number buttons
    const renderPageNumbers = () => {
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

        const MAX_VISIBLE_PAGES = itemsPerPage;

        if (totalPages <= MAX_VISIBLE_PAGES) {
            // Display all page numbers
            return pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`pagination_button ${pageNumber === currentPage ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNumber)}
                >
                    {pageNumber}
                </button>
            ));
        } else {
            const firstPageIndex = Math.floor((currentPage - 1) / MAX_VISIBLE_PAGES) * MAX_VISIBLE_PAGES;
            const visiblePageNumbers = pageNumbers.slice(firstPageIndex, firstPageIndex + MAX_VISIBLE_PAGES);
            const isLastGroup = firstPageIndex + MAX_VISIBLE_PAGES >= totalPages;

            return (
                <>
                    {firstPageIndex > 0 && (
                        <button
                            className="pagination_button"
                            onClick={() => setCurrentPage(firstPageIndex)}
                        >
                            ...
                        </button>
                    )}
                    {visiblePageNumbers.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`pagination_button ${pageNumber === currentPage ? 'active' : ''}`}
                            onClick={() => setCurrentPage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    {!isLastGroup && (
                        <button
                            className="pagination_button"
                            onClick={() => setCurrentPage(firstPageIndex + MAX_VISIBLE_PAGES + 1)}
                        >
                            ...
                        </button>
                    )}
                </>
            );
        }
    };

    return (
        <div className="pagination">
            <div>Viewing items {currentItemRangeFrom} - {currentItemRangeTo} of {totalItems}</div>
            <div>{renderPageNumbers()}</div>
        </div>
    )
}

export default Paging
