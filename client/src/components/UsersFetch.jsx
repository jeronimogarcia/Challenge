import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'
import TableFormat from './TableFormat'

let urlParam = parseInt(window.location.pathname.split('/')[2])
const urlPage = (urlParam < 1 || urlParam > 10) || !urlParam ? 1 : urlParam
// TODO Try to find a better way. Hardcoded

const UsersTable = () => {

  const [usersList, setUsersList] = useState([])
  const [numberOfPages, setNumberOfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(urlPage)
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
        console.log(window.location.pathname)
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
      <TableFormat 
      usersList = {usersList}
      handleOrderName = {handleOrderName}  
      orderToogle = {orderToogle}
      />
    </div>
  )
}

export default UsersTable