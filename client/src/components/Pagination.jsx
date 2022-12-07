import React from 'react'

const Pagination = ({ numberOfPages, handlePrevPage, handleNextPage, handleOnClickPage }) => {
  return (
    <div className='flex flex-row w-[60%] justify-between mb-4'>
      <button onClick={() => handlePrevPage()}>Prev Page</button>
      <ul className='flex flex-row w-[60%] justify-between'>
        {numberOfPages.map((number) =>
          <li key={number} onClick={() => handleOnClickPage(number)}>{number}</li>
        )}
      </ul>
      <button onClick={() => handleNextPage()}>Next Page</button>
    </div>
  )
}

export default Pagination