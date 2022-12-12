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
                onClick={() => handleOrderName("name", "asc", 'nameasc')}
                className={`${iconClass} ${orderToogle === 'nameasc' && iconToogle}`}
              />
            </button>
            <button className='relative top-[2px]'>
              <BsFillArrowDownSquareFill
                onClick={() => handleOrderName("name", "dsc", 'namedsc')}
                className={`${iconClass} ${orderToogle === 'namedsc' && iconToogle}`} />
            </button>
          </th>

          <th className='w-[30%]'>
            <span>Surname</span>
            <button className='mx-1 relative top-[2px]'>
              <BsFillArrowUpSquareFill
                onClick={() => handleOrderName("surname", "asc", 'surnameasc')}
                className={`${iconClass} ${orderToogle === 'surnameasc' && iconToogle}`} />
            </button>
            <button>
              <BsFillArrowDownSquareFill
                onClick={() => handleOrderName("surname", "dsc", 'surnameasc')}
                className={`relative top-[2px] ${iconClass} ${orderToogle === 'surnamedsc' && iconToogle}`} />
            </button>
          </th>

          <th className='w-[25%]'>
            <span> Register Date</span>
            <button className='mx-1 relative top-[2px]'>
              <BsFillArrowUpSquareFill
                onClick={() => handleOrderName("createdAt", "asc", 'createAtasc')}
                className={`${iconClass} ${orderToogle === 'createAtasc' && iconToogle}`} />
            </button>
            <button className='relative top-[2px]'>
              <BsFillArrowDownSquareFill
                onClick={() => handleOrderName("createdAt", "dsc", 'createAtdsc')}
                className={`${iconClass} ${orderToogle === 'createAtdsc' && iconToogle}`} />
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