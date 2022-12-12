import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'
import TableFormat from './TableFormat'

const getUrlPageParam = parseInt(window.location.pathname.split('/')[2])
const pageUrl = (getUrlPageParam < 1 || getUrlPageParam > 10) || !getUrlPageParam ? 1 : getUrlPageParam

const getUrlLimitParam = parseInt(window.location.pathname.split('/')[3])
const limitUrl = (getUrlLimitParam < 10) || !getUrlLimitParam ? 10 : getUrlLimitParam

const getUrlKeyParam = (window.location.pathname.split('/')[4]?.split('=')[0])
const keyUrl = (getUrlKeyParam === 'name' || getUrlKeyParam === 'surname' || getUrlKeyParam === 'createAt') ? getUrlKeyParam : ''

const getUrlOrderParam = window.location.pathname.split('/')[4]?.split('=')[1]
const orderUrl = (getUrlOrderParam === 'asc'|| getUrlOrderParam === 'dsc' ? getUrlOrderParam : '')

// TODO Try to find a better way. Hardcoded

const minNumberOfUsersPerPage = 9

const UsersTable = () => {

  const [usersList, setUsersList] = useState([])
  const [numberOfPages, setNumberOfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(pageUrl)
  const [key, setKey] = useState(keyUrl)
  const [order, setOrder] = useState(orderUrl)
  const [orderToogle, setOrderToogle] = useState(`${keyUrl}${orderUrl}`)
  const [inputNumber, setInputNumber] = useState(limitUrl)
  const [isLoading, setIsLoading] = useState(false)

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

  const handleOrderName = (keyName, orderName, toogleOrder) => {
    if (orderName === order && keyName === key) {
      setKey('')
      setOrder('')
      setOrderToogle(null)
    } else {
      setKey(keyName)
      setOrder(orderName)
      setOrderToogle(toogleOrder)
    }
  }

  const handleInputValue = (numberOfUsersPerPage) => {
    if (numberOfUsersPerPage > minNumberOfUsersPerPage)
      setInputNumber(numberOfUsersPerPage)
  }


  useEffect(() => {
    setIsLoading(true)
    fetch(`/users/?page=${currentPage}&usersPerPage=${inputNumber}&orderKey=${key}&order=${order}`)
      .then(res => res.json())
      .then(data => {
        setUsersList(data.responseObject.users)
        setNumberOfPages(data.responseObject.size)
        handleOnClickPage(parseInt(data.responseObject.page))
        window.history.replaceState(null, null, `/users/${data.responseObject.page}/${data.responseObject.usersPerPage}${key && `/${key}=${order}`}`)
      })
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

  }, [currentPage, key, order, inputNumber])

  return (
    <div className='mt-8 pb-8 flex flex-col items-center bg-[#F9F9F9]'>
      <Pagination
        numberOfPages={numberOfPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleOnClickPage={handleOnClickPage}
        currentPage={currentPage}
        handleInputValue={handleInputValue}
        isLoading={isLoading}
        inputNumber={inputNumber}
      />
      <TableFormat
        usersList={usersList}
        handleOrderName={handleOrderName}
        orderToogle={orderToogle}
      />
    </div>
  )
}

export default UsersTable