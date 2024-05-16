import PaginatorCss from "./PaginatorCss.module.css";
import React from "react";

function Paginator({pagesCount, currentPage, onPageChanged}) {

    let pages = [];
    for (let i = 1; i <= pagesCount(); i++) {
        pages.push(i);
    }

    let slicedPages;
    let curPage = currentPage;
    if (curPage - 3 < 0) {
        slicedPages = pages.slice(0, 5);
    } else {
        slicedPages = pages.slice(curPage - 3, curPage + 2);
    }

    return (
        <div className={PaginatorCss.pageString}>
            {slicedPages.map((p) => {
                return (<span key={p} className={currentPage === p ? PaginatorCss.selectedPage : PaginatorCss.page}
                              onClick={() => {
                                  onPageChanged(p)
                              }}>{p}</span>);
            })}
        </div>
    );
}

export default Paginator;