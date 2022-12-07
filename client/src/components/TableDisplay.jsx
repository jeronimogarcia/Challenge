import React from 'react'

const TableDisplay = ({ user }) => {
  return (
    <tr className='border-t-2 border-[rgb(154,25,130)]'>
      <td><img className='h-[50px] my-[2px]' src= {user.avatar} alt="Foto de Avatar"/></td>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{user.createdAt} </td>
    </tr>
  )
}

export default TableDisplay