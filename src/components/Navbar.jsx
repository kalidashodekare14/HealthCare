"use client"
import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import dynamic from 'next/dynamic';



const Navbar = () => {

  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  console.log(toggle)

  return (
    <div className='relative z-20'>
      <nav className='absolute top-0 w-full lg:px-32 px-3 flex justify-between py-5 font-roboto font-[200]'>
        <div className='flex items-center gap-20'>
          <h1 className='text-3xl'>HealthCare</h1>
          <ul className='hidden lg:flex items-center gap-5 text-[18px] font-[300]'>
            <li>Home</li>
            <li>About</li>
            <li>Find Doctor</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='flex items-center gap-5 text-[19px]'>
          <IoSearchOutline className='hidden lg:flex' />
          <button className='btn w-32 bg-gradient-to-r from-[#0fb3c9] to-[#0a91b9] border-0 text-white'>Login</button>
          <FaBars onClick={handleToggle} className='lg:hidden' />
        </div>
        <ul className={`absolute left-0 p-5 lg:hidden  bg-green-600 w-full flex flex-col  gap-5 text-[19px] font-[300] translate-y-14 duration-700  ${toggle ? "translate-x-0" : "-translate-x-full"}`}>
          <li>Home</li>
          <li>About</li>
          <li>Find Doctor</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false })