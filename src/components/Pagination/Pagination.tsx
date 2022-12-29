import { usePagination } from 'hooks/usePagination';
import { usePokemonContext } from 'hooks/usePokemonContext';
import React, { useEffect, useState } from 'react';
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg';
import './Pagination.scss';


export const Pagination = () => {

    const {handlePagination, store: {page}} = usePokemonContext();

    const [state, setState] = useState<{ pages: { value: number, text: string | number, active: boolean }[] }>();

    const paginationController = usePagination(5);

    useEffect(() => {
        const pages = load();
        setState({pages});
    }, [page.count, page]);

    const load = () => {
        const boxPages = paginationController.generateArrayOfPages(20, page.count);
        const pages = boxPages.isRight()
            ? boxPages.value
            : [];
        return paginationController.getPageRangeArray(page.currentPage, pages);
    };

    const handleClick = (page: number) => {
        const limit = 20;
        const offset = page === 1 ? 0 : ((page - 1) * limit);

        handlePagination({page, limit, offset});
        paginationController.setPaginationRef({ page });

    };


    if (!page.count) return null;

    return (
        (state && state.pages) ? (
            <div>
                <div className="paginationContainer">
                    <button
                        className="paginationButton"
                        onClick={() => handleClick(page.currentPage - 1)}
                    >
                        <CgChevronDoubleLeft color='#000' />
                    </button>
                    <ul className="paginationList">
                        {state.pages.map(({ value, text }) => {
                            return (
                                <li
                                    key={`page-${value}`}
                                    onClick={() => handleClick(value)}>
                                    {text}
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        className="paginationButton"
                        onClick={() => handleClick(page.currentPage + 1)}>
                        <CgChevronDoubleRight color='#000' />
                    </button>
                </div>
            </div>
        ) : null
    );
};
