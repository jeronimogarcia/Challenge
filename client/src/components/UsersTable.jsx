import React, { useEffect, useState } from 'react'
import TableDisplay from '../components/TableDisplay'
import Pagination from './Pagination'

let queryParam = parseInt(window.location.pathname.split('/')[2].split('=')[1])
if(queryParam < 1 || queryParam > 10) queryParam = 1;
// TODO Try to find a better way. Hardcoded


const UsersTable = () => {

  const [usersList, setUsersList] = useState([])
  const [numberOfPages, setNumberOfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(queryParam)

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
    fetch(`/api/?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setUsersList(data.responseObject.users)
        setNumberOfPages(data.responseObject.size)
        window.history.replaceState(null, null, `/api/page=${data.responseObject.page}`)
      })
  }, [currentPage])

  return (
    <div className='mr-8 ml-8 mt-8 pb-8 flex flex-col items-center'>
      <Pagination 
      numberOfPages={ numberOfPages } 
      handlePrevPage= { handlePrevPage }
      handleNextPage= { handleNextPage }
      handleOnClickPage= { handleOnClickPage }
      currentPage = {currentPage}
      />
      <div>{currentPage}</div>
      <table className='border-collapse w-[60%]'>
        <thead className='text-left'>
          <tr className='h-[28px]'>
            <th className='w-[15%]'>Avatar</th>
            <th>Nombre</th>
            <th className='w-[25%]'>Apellido</th>
            <th className='w-[30%]'>Fecha Registro</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => {
            return <TableDisplay key={user.id} user={user}/>
          })}
        </tbody>
      </table>
    </div>

  )
}

export default UsersTable