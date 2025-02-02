"use client"
import UserData from '@/hooks/UserData'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaArrowRight, FaBarsStaggered } from 'react-icons/fa6'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { LuMessageSquare } from 'react-icons/lu'
import userLogo from '../../../../public/image/nav_img.png'
import Link from 'next/link'
import { RotatingLines } from 'react-loader-spinner'
import { signOut } from 'next-auth/react'

const DashboardHeader = ({ isToggle, handleToggle }) => {

    const [isDropdownToggle, setIsDropdownToggle] = useState(false)
    const [user_bio, refetch, userLoading] = UserData()


    const handleDropdownToggle = () => {
        setIsDropdownToggle(!isDropdownToggle)
    }

    if (userLoading) {
        return <div className='h-[600px] flex justify-center items-center'>
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    return (
        <div className='py-5 lg:px-10 px-3 flex justify-between items-center'>
            <div className='duration-500 transition-transform'>
                {
                    isToggle ? (
                        <FaArrowRight onClick={handleToggle} className='text-2xl cursor-pointer transform rotate-180' />
                    ) : (
                        <FaBarsStaggered onClick={handleToggle} className='text-2xl cursor-pointer transform rotate-180' />
                    )
                }
            </div>
            <div className='flex items-center gap-5'>
                <div className='relative w-14 h-12 cursor-pointer'>
                    <div className='relative flex justify-center items-center w-12 h-12 rounded-full border'>
                        <IoMdNotificationsOutline className='text-2xl text-[#307bc4]' />
                    </div>
                    <div className='w-6 h-6 flex justify-center items-center absolute top-0 right-0 bg-[#307bc4] rounded-full'>
                        <span className='text-white'>10</span>
                    </div>
                </div>
                <div className='relative w-14 h-12 cursor-pointer'>
                    <div className='relative flex justify-center items-center w-12 h-12 rounded-full border'>
                        <LuMessageSquare className='text-2xl text-[#307bc4]' />
                    </div>
                    <div className='w-6 h-6 flex justify-center items-center absolute top-0 right-0 bg-[#307bc4] rounded-full'>
                        <span className='text-white'>15</span>
                    </div>
                </div>
                <div>
                    <div className='flex items-center '>
                        <div onClick={handleDropdownToggle} className='z-10  flex justify-end items-center  gap-3 pr-3 h-12 font-rubik bg-none lg:bg-gradient-to-r from-[#307ac43a] to-[#307ac42c]  rounded-full'>
                            <div className='relative z-20 cursor-pointer w-[50px] h-[50px] rounded-full bg-white'>
                                {
                                    user_bio?.image ? (
                                        <Image
                                            className='w-full h-full rounded-full'
                                            src={user_bio?.image}
                                            width={500}
                                            height={300}
                                            alt={user_bio?.name}
                                        />
                                    ) : (
                                        <Image
                                            className='w-full h-full rounded-full'
                                            src={userLogo}
                                            width={500}
                                            height={300}
                                            alt='Image'
                                        />
                                    )
                                }
                                {
                                    isDropdownToggle && (
                                        <div className={`absolute -left-1/2 w-52 h-auto  bg-white shadow-lg space-y-2`}>
                                            <Link href={'/dashboard/profile'}>
                                                <div className='hover:bg-[#307bc4] border-b hover:text-white p-2'>
                                                    <h1>Profile</h1>
                                                </div>
                                            </Link>
                                            <div onClick={() => signOut()} className='hover:bg-[#307bc4] border-b hover:text-white p-2'>
                                                <h1>Logout</h1>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <p className='lg:flex hidden text-[#307bc4]'>
                                <span>Hello,</span>
                                {
                                    user_bio?.name ? (
                                        <span className='font-bold'>{user_bio?.name}</span>
                                    ) : (
                                        <span className='font-bold'>Man</span>
                                    )
                                }

                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardHeader