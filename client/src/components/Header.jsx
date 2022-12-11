import React from 'react'
import logo from "../Transparent.png";

const Header = () => {
  return (
    <header className="flex justify-between bg-gray-200 shadow-lg">
      <img src={logo} className="h-[100px]" alt="logo de la empresa" />
      <h1 className='flex items-center mr-4 text-3xl font-medium text-colorLogo'>Challenge - Jerónimo García</h1>
    </header>
  )
}

export default Header