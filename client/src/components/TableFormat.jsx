import React from 'react'
import { BsFillArrowUpSquareFill, BsFillArrowDownSquareFill } from 'react-icons/bs'
import TableUsersRow from './TableUsersRow'

const iconClass = "text-colorLogo hover:bg-yellow-300"
const iconToogle = "bg-yellow-300 text-black"

const TableFormat = ({ usersList, orderToogle, handleOrderName }) => {
  return (
    <table className='border-collapse w-[60%]'>
      <thead className='text-left'>
        <tr className='h-[28px] text-xl'>
          <th className='w-[15%]'>Avatar</th>

          <th className='w-[30%]'>
            <span>Name</span>
            <button className='mx-1 relative top-[2px]'>
              <BsFillArrowUpSquareFill
                onClick={() => handleOrderName("name", "asc", 'nameAsc')}
                className={`${iconClass} ${orderToogle === 'nameAsc' && iconToogle}`}
              />
            </button>
            <button className='relative top-[2px]'>
              <BsFillArrowDownSquareFill
                onClick={() => handleOrderName("name", "dsc", 'nameDsc')}
                className={`${iconClass} ${orderToogle === 'nameDsc' && iconToogle}`} />
            </button>
          </th>

          <th className='w-[30%]'>
            <span>Surname</span>
            <button className='mx-1 relative top-[2px]'>
              <BsFillArrowUpSquareFill
                onClick={() => handleOrderName("surname", "asc", 'surnameAsc')}
                className={`${iconClass} ${orderToogle === 'surnameAsc' && iconToogle}`} />
            </button>
            <button>
              <BsFillArrowDownSquareFill
                onClick={() => handleOrderName("surname", "dsc", 'surnameDsc')}
                className={`relative top-[2px] ${iconClass} ${orderToogle === 'surnameDsc' && iconToogle}`} />
            </button>
          </th>

          <th className='w-[25%]'>
            <span> Register Date</span>
            <button className='mx-1 relative top-[2px]'>
              <BsFillArrowUpSquareFill
                onClick={() => handleOrderName("createdAt", "asc", 'dateAsc')}
                className={`${iconClass} ${orderToogle === 'dateAsc' && iconToogle}`} />
            </button>
            <button className='relative top-[2px]'>
              <BsFillArrowDownSquareFill
                onClick={() => handleOrderName("createdAt", "dsc", 'dateDsc')}
                className={`${iconClass} ${orderToogle === 'dateDsc' && iconToogle}`} />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => {
          return <TableUsersRow key={user.id} user={user} />
        })}
      </tbody>
    </table>
  )
}

export default TableFormat