"use client"
import UserData from '@/hooks/UserData'
import Image from 'next/image'
import React from 'react'
import { FaArrowRight, FaBarsStaggered } from 'react-icons/fa6'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { LuMessageSquare } from 'react-icons/lu'
import userLogo from '../../../../public/image/nav_img.png'

const DashboardHeader = ({ isToggle, handleToggle }) => {

    const [user_bio, refetch, userLoading] = UserData()

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
                        <div className='z-10  flex justify-end items-center  gap-3 pr-3 h-12 font-rubik bg-none lg:bg-gradient-to-r from-[#307ac43a] to-[#307ac42c] text-[#307bc4] rounded-full'>
                            <div className='z-20 cursor-pointer w-[50px] h-[50px] rounded-full bg-white'>
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

                            </div>
                            <p className='lg:flex hidden'>
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