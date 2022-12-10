import React, { useEffect, useState } from 'react'
import TableDisplay from '../components/TableDisplay'
import Pagination from './Pagination'
import { BsFillArrowUpSquareFill, BsFillArrowDownSquareFill } from 'react-icons/bs'

let urlParam = parseInt(window.location.pathname.split('/')[2])
const urlParameter = (urlParam < 1 || urlParam > 10) || !urlParam ? 1 : urlParam
// if (urlParam < 1 || urlParam > 10) urlParam = 1;
// TODO Try to find a better way. Hardcoded


const UsersTable = () => {

  const [usersList, setUsersList] = useState([])
  const [numberOfPages, setNumberOfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(urlParameter)
  const [key, setKey] = useState('')
  const [order, setOrder] = useState('')
  const [orderToogle, setOrderToogle] = useState(null)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevState => prevState - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < numberOfPages.length) {
      setCurrentPage(prevState => prevState + 1)
    }
  }

  const handleOnClickPage = (number) => {
    setCurrentPage(number)
  }

  const handleOrderName = (keyName, orderName, toogleNumber) => {
    if (orderName === order && keyName === key) {
      setKey('')
      setOrder('')
      setOrderToogle(null)
    } else {
      setKey(keyName)
      setOrder(orderName)
      setOrderToogle(toogleNumber)
    }
  }


  useEffect(() => {
    fetch(`/users/?page=${currentPage}&orderKey=${key}&order=${order}`)
      .then(res => res.json())
      .then(data => {
        setUsersList(data.responseObject.users)
        setNumberOfPages(data.responseObject.size)
        window.history.replaceState(null, null, `/users/${data.responseObject.page}${key && `/${key}=${order}`}`)
      })
  }, [currentPage, key, order])

  return (
    <div className='mr-8 ml-8 mt-8 pb-8 flex flex-col items-center'>
      <Pagination
        numberOfPages={numberOfPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleOnClickPage={handleOnClickPage}
        currentPage={currentPage}
      />
      <table className='border-collapse w-[60%]'>
        <thead className='text-left'>
          <tr className='h-[28px] text-xl'>
            <th className='w-[15%]'>Avatar</th>

            <th className='w-[30%]'>
              <span>Name</span>
              <button className='mx-1 relative top-[2px]'>
                <BsFillArrowUpSquareFill
                  onClick={() => handleOrderName("name", "asc", 1)}
                  className={`text-[rgb(154,25,130)] hover:bg-yellow-300 ${orderToogle === 1 && "bg-yellow-300 text-black"}`}
                />
              </button>
              <button className='relative top-[2px]'>
                <BsFillArrowDownSquareFill
                  onClick={() => handleOrderName("name", "dsc", 2)}
                  className={`text-[rgb(154,25,130)] hover:bg-yellow-300 ${orderToogle === 2 && "bg-yellow-300 text-black"}`} />
              </button>
            </th>

            <th className='w-[30%]'>
              <span>Surname</span>
              <button className='mx-1 relative top-[2px]'>
                <BsFillArrowUpSquareFill
                onClick={() => handleOrderName("surname", "asc", 3)}
                className={`text-[rgb(154,25,130)] hover:bg-yellow-300 ${orderToogle === 3 && "bg-yellow-300 text-black"}`} />
              </button>
              <button>
                <BsFillArrowDownSquareFill
                onClick={() => handleOrderName("surname", "dsc", 4)}
                className={`relative top-[2px] text-[rgb(154,25,130)] hover:bg-yellow-300 ${orderToogle === 4 && "bg-yellow-300 text-black"}`} />
              </button>
            </th>

            <th className='w-[25%]'>
              <span> Register Date</span>
              <button className='mx-1 relative top-[2px]'>
                <BsFillArrowUpSquareFill
                onClick={() => handleOrderName("createAt", "asc", 5)}
                className={`text-[rgb(154,25,130)] hover:bg-yellow-300 ${orderToogle === 5 && "bg-yellow-300 text-black"}`} />
              </button>
              <button className='relative top-[2px]'>
                <BsFillArrowDownSquareFill
                onClick={() => handleOrderName("createAt", "dsc", 6)}
                className={`text-[rgb(154,25,130)] hover:bg-yellow-300 ${orderToogle === 6 && "bg-yellow-300 text-black"}`} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => {
            return <TableDisplay key={user.id} user={user} />
          })}
        </tbody>
      </table>
    </div>

  )
}

export default UsersTable