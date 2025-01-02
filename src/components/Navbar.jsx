"use client"
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import logo from '../../public/logo.png'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import UserData from '@/hooks/UserData';
import { FaUser } from 'react-icons/fa6';
import nav_img from '../../public/image/nav_img.png'

const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()
  const session = useSession()
  const [user_bio] = UserData()

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

  const navgicaton = [
    {
      "id": "1",
      "name": "Home",
      "path": "/"
    },
    {
      "id": "2",
      "name": "About",
      "path": "/about"
    },
    {
      "id": "3",
      "name": "Service",
      "path": "/services"
    },
    {
      "id": "4",
      "name": "Doctors",
      "path": "/doctors"
    },
    {
      "id": "5",
      "name": "Blog",
      "path": "/blog"
    },
    {
      "id": "6",
      "name": "Contact",
      "path": "/contact"
    },
  ]

  return (
    <div className={`${isSticky ? "sticky top-0 z-50 bg-[#ffffffb9] shadow-xl backdrop-blur-lg transition-all duration-300 opacity-100" : "bg-white"}`}>
      <nav className={` z-50 w-full lg:px-32 px-3 flex justify-between py-3 font-roboto font-[200]`}>
        <div className='flex items-center gap-20'>
          <h1 className='text-3xl'>
            <Image className='w-40' src={logo} width={500} height={300} alt="Logo" />
          </h1>
          <ul className='hidden lg:flex items-center gap-5 text-[16px] font-[400]'>
            {
              navgicaton.map((navi) => (
                <Link className={`${pathname == navi.path && "text-[#307bc4] border-b-2 border-[#307bc4]"} hover:text-[#307bc4]`} key={navi.id} href={navi.path}>
                  <li className='font-rubik'>{navi.name}</li>
                </Link>
              ))
            }
          </ul>
        </div>
        <div className='flex items-center gap-5 text-[19px]'>
          <IoSearchOutline className='hidden lg:flex' />
          {
            session.data ? (
              <div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-32 h-full border flex justify-center items-center rounded-full">
                      {
                        user_bio.image ? (
                          <div>
                            <Image
                              className='w-full h-full'
                              src={user_bio.image}
                              width={500}
                              height={300}
                              alt="user image"
                              priority={false}
                            />
                          </div>
                        ) : (
                          <Image
                            className='w-full h-full'
                            src={nav_img}
                            width={500}
                            height={300}
                            alt='user image'
                          />
                        )
                      }

                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="font-rubik z-50 menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow">
                    <li>
                      <Link href={'/profile'}>
                        <button className="justify-between">
                          Profile
                        </button>
                      </Link>
                    </li>
                    <li><a>Settings</a></li>
                    <li>
                      <button onClick={() => signOut()}>Logout</button>
                    </li>

                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <Link href={"/signin"}>
                  <button className='btn w-32 bg-[#307bc4] border-0 text-white font-rubik'>Login</button>
                </Link>
              </div>
            )
          }
          <FaBars onClick={handleToggle} className='lg:hidden' />
        </div>
        <ul className={`z-50 absolute left-0 p-5 lg:hidden  bg-[#307bc4] text-white w-full flex flex-col  gap-5 text-[19px] font-[300] translate-y-14 duration-700  ${toggle ? "translate-x-0" : "-translate-x-full"}`}>
          {
            navgicaton.map((navi) => (
              <Link className={`${pathname == navi.path && "text-white border-b-2 border-[#000000]"} hover:text-[#307bc4]`} key={navi.id} href={navi.path}>
                <li className='font-rubik'>{navi.name}</li>
              </Link>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false })