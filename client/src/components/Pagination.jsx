import React from 'react'


const Pagination = ({ numberOfPages, handlePrevPage, handleNextPage, handleOnClickPage, currentPage }) => {
  
  return (
    <div className='flex flex-row w-[60%] justify-between mb-8'>

      <button 
      className='w-[100px] py-1 rounded  text-white hover:text-yellow-300 bg-[rgb(154,25,130)]'
      onClick={() => handlePrevPage()}>
      Prev Page
      </button>

      <ul className='flex flex-row w-[50%] justify-between items-center'>
        {numberOfPages.map((number) =>
          <li key={number}>
            <button 
            className={`w-7 h-7 bg-[rgb(154,25,130)] rounded text-white font-semibold hover:text-yellow-300
            ${ currentPage === number && "bg-black text-yellow-300"}`} 
            onClick={() => handleOnClickPage(number)}>
            {number}
            </button>
          </li>
        )}
      </ul>

      <button className='w-[100px] py-1 rounded bg-[rgb(154,25,130)] text-white hover:text-yellow-300'
      onClick={() => handleNextPage()}>
      Next Page
      </button>
    </div>
  )
}

export default Pagination