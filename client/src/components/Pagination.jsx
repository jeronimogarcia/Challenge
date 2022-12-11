import React, { useState } from 'react'

const buttonClass = `w-[100px] py-1 rounded  text-white hover:text-yellow-300 bg-colorLogo`

const Pagination = ({
  numberOfPages,
  handlePrevPage, 
  handleNextPage, 
  handleOnClickPage, 
  currentPage, 
  handleInputValue,
  inputNumber,
  isLoading
  }) => {

  const [inputValue, setInputValue] = useState(inputNumber)

  return (
    <div className='flex flex-col w-[60%]'>
      <div className='flex flex-row justify-between mb-6' >
        <button
          className=
          {`${buttonClass} 
          ${isLoading ? "opacity-70" : "opacity-100"}`}
          onClick={() => handlePrevPage()}>
          Prev Page
        </button>

        <ul className='flex flex-row w-[50%] justify-center items-center'>
          {numberOfPages.map((number) =>
            <li key={number}>
              <button
                className={`w-7 h-7 bg-colorLogo rounded text-white font-semibold hover:text-yellow-300 m-[5px]
                ${currentPage === number && "bg-black text-yellow-300"}  
                ${isLoading ? "opacity-70" : "opacity-100"}`}
                onClick={() => handleOnClickPage(number)}>
                {number}
              </button>
            </li>
          )}
        </ul>

        <button
          disabled={isLoading}
          className=
          {`${buttonClass} 
          ${isLoading ? "opacity-70" : "opacity-100"}`}
          onClick={() => handleNextPage()}>
          Next Page
        </button>
      </div>

      <div className='flex flex-row justify-center mb-4'>
        <p className='flex items-end font-semibold'>Usuarios por página</p>
        <input
          className="border border-gray-800 px-1 rounded outline-none mx-4 text-black"
          type="number"
          name="usersPerPage"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() => handleInputValue(inputValue)}
          className={`${buttonClass}`}
          >Confirm
        </button>
      </div>
    </div>
  )
}

export default Pagination