"use client"
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import dynamic from 'next/dynamic';



const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  console.log(isSticky)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 150;
      setIsSticky(!isTop)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`${isSticky ? "sticky top-0 z-50 bg-[#ffffffb9] backdrop-blur-lg transition-all duration-300 opacity-100" : "bg-white"}`}>
      <nav className={` z-50 w-full lg:px-32 px-3 flex justify-between py-3 font-roboto font-[200]`}>
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
          <button className='btn w-32 bg-[#307bc4] border-0 text-white'>Login</button>
          <FaBars onClick={handleToggle} className='lg:hidden' />
        </div>
        <ul className={`z-50 absolute left-0 p-5 lg:hidden  bg-green-600 w-full flex flex-col  gap-5 text-[19px] font-[300] translate-y-14 duration-700  ${toggle ? "translate-x-0" : "-translate-x-full"}`}>
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