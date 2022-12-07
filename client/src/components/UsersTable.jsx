import React, { useEffect, useState } from 'react'
import TableDisplay from '../components/TableDisplay'
import Pagination from './Pagination'

const UsersTable = () => {

  const [usersList, setUsersList] = useState([])
  const [numberOfPages, setNumberOfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const handlePrevPage = () => {
    if (currentPage > 1){
      setCurrentPage(prevState => prevState - 1)
    }
  }
  const handleNextPage= () => {
    if (currentPage < numberOfPages.length) {
      setCurrentPage(prevState => prevState + 1)
    }
  }
  const handleOnClickPage= (number) => {
    setCurrentPage(number)
  }


  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        setUsersList(data.requestObject.users)
        setNumberOfPages(data.requestObject.size)
      })
  }, [])

  return (
    <div className='mr-8 ml-8 mt-8 pb-8 flex flex-col items-center'>
      <Pagination 
      numberOfPages={ numberOfPages } 
      handlePrevPage= { handlePrevPage }
      handleNextPage= { handleNextPage }
      handleOnClickPage= { handleOnClickPage }
      />
      <div>{currentPage}</div>
      <table className='border-collapse w-[60%]'>
        <thead className='text-left'>
          <tr className='h-[28px]'>
            <th className='pr-7'>Avatar</th>
            <th className='pr-7'>Nombre</th>
            <th className='pr-7'>Apellido</th>
            <th className='w-[200px]'>Fecha Registro</th>
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