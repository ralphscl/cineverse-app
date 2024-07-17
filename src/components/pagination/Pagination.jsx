import React from 'react'
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

  const handleNextPage = () => setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : prevPage);

  const handlePrevPage = () => setCurrentPage(prevPage => prevPage < 1 ? prevPage - 1 : prevPage)

  return (
    <div className='pagination'>
      <a onClick={handlePrevPage}>
        Prev
      </a>

      {renderPages(currentPage, totalPages, setCurrentPage)}

      <a onClick={handleNextPage}>
        Next
      </a>
    </div>
  )
}

const renderPages = (currentPage, totalPages, setCurrentPage) => {
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);
  const pages = [];

  console.log(currentPage, startPage, endPage)
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <a
        onClick={() => setCurrentPage(i)}
        disabled={currentPage === i}
      >
        {i}
      </a>
    )
  }
  console.log("pages", pages)

  return pages;
}

export default Pagination