import React, { useEffect, useState } from 'react'
import TableDisplay from '../components/TableDisplay'

const UsersTable = () => {

  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setUsersList(data.userList))
  }, [])

  return (
    <div className='mr-8 ml-8 mt-8 pb-8 flex justify-center'>
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