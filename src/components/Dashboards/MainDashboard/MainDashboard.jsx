"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FaDollarSign, FaHeartPulse, FaStethoscope, FaWpforms } from 'react-icons/fa6'


const MainDashboard = () => {

    const { data: dataCollection = [] } = useQuery({
        queryKey: ["dataCollection"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/dashboard/api`)
            return res.data
        }
    })

    console.log(dataCollection)

    return (
        <div className='bg-[#f6fbf8] px-5'>
            <div className='font-rubik py-5 spae-y-2'>
                <h1 className='text-2xl'>Welcome</h1>
                <p className='text-xl'>Hospital Admin Dashboard</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <div className='flex  justify-between items-center font-rubik bg-gradient-to-r from-[#f89f9d] to-[#f5827f] rounded-2xl text-white p-5'>
                    <div className=''>
                        <p>Total Patient</p>
                        {
                            dataCollection?.totalDoctors ? (
                                <p>{dataCollection?.totalDoctors[0]?.totalDoctors}</p>
                            ) : (
                                <p>0</p>
                            )
                        }
                    </div>
                    <div className='w-10 h-10 rounded-full flex justify-center items-center border'>
                        <FaHeartPulse />
                    </div>
                </div>
                <div className='flex  justify-between items-center font-rubik bg-gradient-to-r from-[#74d68f] to-[#49ca6d] rounded-2xl text-white p-5'>
                    <div className=''>
                        <p>Doctors</p>
                        {
                            dataCollection?.totalDoctors ? (
                                <p>{dataCollection?.totalPatients[0]?.totalPatient}</p>
                            ) : (
                                <p>0</p>
                            )
                        }
                    </div>
                    <div className='w-10 h-10 rounded-full flex justify-center items-center border'>
                        <FaStethoscope />
                    </div>
                </div>
                <div className='flex  justify-between items-center font-rubik  bg-gradient-to-r from-[#7bbfdb] to-[#4aa7ce] rounded-2xl text-white p-5'>
                    <div className=''>
                        <p>Appoinment</p>
                        <p>748k</p>
                    </div>
                    <div className='w-10 h-10 rounded-full flex justify-center items-center border'>
                        <FaWpforms />
                    </div>
                </div>
                <div className='flex  justify-between items-center font-rubik bg-gradient-to-r from-[#c37bdc] to-[#b052d0] rounded-2xl text-white p-5'>
                    <div className=''>
                        <p>Hospital Earning</p>
                        <p>3048k</p>
                    </div>
                    <div className='w-10 h-10 rounded-full flex justify-center items-center border'>
                        <FaDollarSign />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDashboard