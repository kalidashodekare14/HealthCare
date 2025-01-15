"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaRegHospital } from 'react-icons/fa6';
import { GrCertificate } from 'react-icons/gr';
import { RotatingLines } from 'react-loader-spinner';

const DoctorsSection = () => {


    const { data: doctors = [], refetch, isLoading: doctorDataLoading } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_BASE_URL}/doctors/api`)
            return res.data
        }
    })

    console.log(doctors)


    if (doctorDataLoading) {
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
        <div className='lg:mx-10 mx-5'>
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
                                <Link href={`/doctors/${doctor?._id}`}>
                                    <button className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] border-1 hover:border-[#307bc4] text-white w-32'>Profile</button>
                                </Link>
                                <Link href={`/appoinment/${doctor?._id}`}>
                                    <button className='btn hover:bg-[#307bc4] bg-white text-[#307bc4]  hover:text-white border-1 w-32 border-[#307bc4]'>Appointment</button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorsSection