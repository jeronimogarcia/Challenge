import React from 'react'

const TableUsersRow = ({ user }) => {

  const formatDate = () => {
    const date = new Date(user.createdAt).toDateString()
    return date
  }

  return (
    <tr className='border-t-2 border-colorLogo font-medium'>
      <td><img className='h-[50px] my-[2px]' src={user.avatar} alt="Foto de Avatar" /></td>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{formatDate()}</td>
    </tr>
  )
}

export default TableUsersRow