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
  const [orderName, setOrderName] = useState('')
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

  const handleOrderName = (order) => {
    if (orderName === order) {
      setOrderName('')
      setOrderToogle(null)
    } else {
      setOrderName(order)
      setOrderToogle(order)
    }
  }


  useEffect(() => {
    fetch(`/users/?page=${currentPage}&orderName=${orderName}`)
      .then(res => res.json())
      .then(data => {
        setUsersList(data.responseObject.users)
        setNumberOfPages(data.responseObject.size)
        window.history.replaceState(null, null, `/users/${data.responseObject.page}`)
        // TODO PUSH ROUTE TO USERS 1
      })
  }, [currentPage, orderName])

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
                  onClick={() => handleOrderName("asc")}
                  className={`text-[rgb(154,25,130)] hover:bg-yellow-300 ${orderToogle === 'asc' && "bg-yellow-300 text-black"}`}
                />
              </button>
              <button className='relative top-[2px]'>
                <BsFillArrowDownSquareFill
                  onClick={() => handleOrderName("dsc")}
                  className={`text-[rgb(154,25,130)] hover:bg-yellow-300 ${orderToogle === 'dsc' && "bg-yellow-300 text-black"}`} />
              </button>
            </th>

            <th className='w-[30%]'>
              <span>Surname</span>
              <button className='mx-1 relative top-[2px]'>
                <BsFillArrowUpSquareFill className='text-[rgb(154,25,130)] hover:bg-yellow-300' />
              </button>
              <button>
                <BsFillArrowDownSquareFill className='relative top-[2px] text-[rgb(154,25,130)] hover:bg-yellow-300' />
              </button>
            </th>

            <th className='w-[25%]'>
              <span> Register Date</span>
              <button className='mx-1 relative top-[2px]'>
                <BsFillArrowUpSquareFill className='text-[rgb(154,25,130)] hover:bg-yellow-300' />
              </button>
              <button className='relative top-[2px]'>
                <BsFillArrowDownSquareFill className='text-[rgb(154,25,130)] hover:bg-yellow-300' />
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