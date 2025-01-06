"use client"
import UserData from '@/hooks/UserData'
import Image from 'next/image'
import React from 'react'
import { FaBarsStaggered } from 'react-icons/fa6'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { LuMessageSquare } from 'react-icons/lu'

const DashboardHeader = () => {

    const [user_bio, refetch, userLoading] = UserData()

    return (
        <div className='py-5 px-10 flex justify-between items-center'>
            <FaBarsStaggered className='text-2xl' />
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
                        <div className='z-20 w-[50px] h-[50px] rounded-full bg-white'>
                            <Image
                                className='w-full h-full rounded-full bg-white'
                                src={user_bio?.image}
                                width={500}
                                height={300}
                                alt={user_bio?.name}
                            />
                        </div>
                        <div className='z-10 -ml-10 flex justify-end items-center w-44 px-2 h-12 font-rubik bg-[#307ac457] text-[#307bc4] rounded-full'>
                            <p>Hello, <span>{user_bio?.name}</span></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardHeader