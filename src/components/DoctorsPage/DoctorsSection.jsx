"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react'
import { FaRegHospital } from 'react-icons/fa6';
import { GrCertificate } from 'react-icons/gr';

const DoctorsSection = () => {


    const { data: doctors = [] } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/doctors/api`)
            return res.data
        }
    })

    console.log(doctors)


    return (
        <div className='lg:mx-10 mx-5'>
            <div className=''>

            </div>
            <div className='grid grid-cols-4 gap-5'>
                {
                    doctors.map(doctor => (
                        <div className='border space-y-2 p-3 font-rubik' key={doctor._id}>
                            <div className='flex justify-center items-center border-b pb-2'>
                                <Image className='w-40 h-40 rounded-full' src={doctor.profilePicture} width={500} height={300} alt='doctor image' />
                            </div>
                            <div className='space-y-2 border-b pb-2'>
                                <h1 className='text-xl font-bold'>{doctor.name}</h1>
                                <div className='flex items-center gap-2'>
                                    <GrCertificate className='text-[15px] text-[#307bc4]' />
                                    <p className='text-[15px]'>{doctor.qualification}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <FaRegHospital className='text-[15px] text-[#307bc4]' />
                                    <p className='text-[15px]'>{doctor?.address.clinic}</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center border-b pb-2'>
                                <div className='flex items-center gap-3'>
                                    {
                                        doctor?.availability?.days.map(day => (
                                            <p key={day}>{day}</p>
                                        ))
                                    }
                                </div>
                                <p className='text-[15px]'>{doctor?.availability?.time}</p>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <button className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] border-1 hover:border-[#307bc4] text-white w-32'>Profile</button>
                                <button className='btn hover:bg-[#307bc4] bg-white text-[#307bc4]  hover:text-white border-1 w-32 border-[#307bc4]'>Appointment</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorsSection