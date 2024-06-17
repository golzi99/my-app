import PaginatorCss from "./PaginatorCss.module.css";
import React from "react";
import cn from 'classnames';

type PropsType = {
    pagesCount: () => number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = ({pagesCount, currentPage, onPageChanged}) => {

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount(); i++) {
        pages.push(i);
    }

    let curPage = currentPage;
    let slicedPages;

    if (curPage - 5 < 0) {
        slicedPages = pages.slice(0, 10);
    } else {
        slicedPages = pages.slice(curPage - 5, curPage + 5);
    }

    return (<div className={PaginatorCss.pageString}>
        {currentPage > 1 && <button onClick={() => {
            onPageChanged(curPage - 1);
        }}>PREV</button>}

        {slicedPages.map((p) => {
            return (<span key={p} className={cn(PaginatorCss.page, {[PaginatorCss.selectedPage]: currentPage === p})}
                          onClick={() => {
                              onPageChanged(p);
                          }}>{p}</span>);
        })}

        {currentPage < pagesCount() && <button onClick={() => {
            onPageChanged(curPage + 1);
        }}>NEXT</button>}
    </div>);
}

export default Paginator;