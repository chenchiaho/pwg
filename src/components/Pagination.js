import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ currentPage, postsPerPage, myPosts, onPageChange }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(myPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className="pagination">
            <ul className="pagination__list">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`pagination__item ${currentPage === number ? 'pagination__item--active' : ''}`}
                    >
                        <a
                            onClick={(e) => {
                                e.preventDefault()
                                onPageChange(number)
                            }}
                            className="pagination__link"
                            href="#"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    postsPerPage: PropTypes.number.isRequired,
    myPosts: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default Pagination
