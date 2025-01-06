"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'

const DoctorsDashboard = () => {

    const { data: doctorsData = [] } = useQuery({
        queryKey: ["doctorsData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/dashboard/doctors/api`)
            return res.data
        }
    })

    console.log(doctorsData)

    return (
        <div className='bg-[#f6fbf8]'>
            <div className='lg:px-10 px-3'>
                <div className='flex justify-between items-center py-5 font-rubik'>
                    <button className='btn bg-[#307bc4] lg:w-32 text-white rounded-2xl'>Add New</button>
                    <div className='relative flex items-center'>
                        <input className='input border border-[#000]' type="text" />
                        <FaSearch className='absolute right-2 text-2xl cursor-pointer' />
                    </div>
                </div>
                <div className="overflow-x-auto bg-white">
                    <table className="table font-rubik">
                        {/* head */}
                        <thead>
                            <tr className='text-[15px]'>
                                <th></th>
                                <th>ID</th>
                                <th>Doctor Name</th>
                                <th>Deparment</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctorsData.map(doctor => (
                                    <tr key={doctor._id}>
                                        <th>
                                            <Image
                                                className='w-14 h-14 rounded-full'
                                                src={doctor?.profilePicture}
                                                width={500}
                                                height={300}
                                                alt='doctor picture'
                                            />
                                        </th>
                                        <td>p-154</td>
                                        <td>{doctor?.name}</td>
                                        <td>{doctor?.department}</td>
                                        <td>{doctor?.contact?.phone}</td>
                                        <td>{doctor?.contact?.email}</td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className=" m-1">
                                                    <CiMenuKebab className='text-2xl' />
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                    <li><a>Item 1</a></li>
                                                    <li><a>Item 2</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DoctorsDashboard