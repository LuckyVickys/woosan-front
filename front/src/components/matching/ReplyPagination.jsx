// src/components/matching/ReplyPagination.jsx

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/Pagination.module.scss';

const ReplyPagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        let startPage, endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
            const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

            if (currentPage <= maxPagesBeforeCurrentPage) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className={styles.pagination}>
            <span
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={`${styles.pageControl} ${currentPage === 1 ? styles.disabled : ''}`}
            >
                &lt;
            </span>
            {pages.map(page => (
                <span
                    key={page}
                    className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </span>
            ))}
            <span
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={`${styles.pageControl} ${currentPage === totalPages ? styles.disabled : ''}`}
            >
                &gt;
            </span>
        </div>
    );
};

ReplyPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default ReplyPagination;
