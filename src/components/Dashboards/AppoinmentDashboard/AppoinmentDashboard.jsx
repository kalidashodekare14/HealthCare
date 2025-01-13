"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'

const AppoinmentDashboard = () => {


    const { data: appoinmentData = [] } = useQuery({
        queryKey: ["appoinmentData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/dashboard/appoinments/api`)
            return res.data
        }
    })

    console.log(appoinmentData)

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
                <div className=" bg-white">
                    <table className="table font-rubik">
                        {/* head */}
                        <thead>
                            <tr className='text-[15px]'>
                                <th>Patient Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Doctor</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appoinmentData.map(appoinmentData => (
                                    <tr key={appoinmentData._id}>
                                        <td>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-14 h-14 rounded-full'>
                                                    {
                                                        appoinmentData?.user_info?.image ? (
                                                            <Image
                                                                className='w-full h-full rounded-full'
                                                                src={`${appoinmentData?.user_info?.image}`}
                                                                width={500}
                                                                height={300}
                                                                alt={`${appoinmentData?.user_info?.name}`}
                                                            />
                                                        ) : (
                                                            <Image
                                                                className='w-full h-full rounded-full'
                                                                src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"}
                                                                width={500}
                                                                height={300}
                                                                alt={`${appoinmentData?.user_info?.name}`}
                                                            />
                                                        )
                                                    }
                                                </div>

                                                <div className='flex flex-col'>
                                                    <p>{appoinmentData?.patient_name || "N/A"}</p>
                                                    <p>{appoinmentData?.transaction_id || "N/A"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                new Date(appoinmentData.appoinment_date).toLocaleDateString() || "N/A"
                                            }
                                        </td>
                                        <td>04.00</td>
                                        <td>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-14 h-14 rounded-full'>
                                                    {
                                                        appoinmentData?.doctorInfo?.doctor_image ? (
                                                            <Image
                                                                className='w-full h-full rounded-full'
                                                                src={`${appoinmentData?.doctorInfo?.doctor_image}`}
                                                                width={500}
                                                                height={300}
                                                                alt={`${appoinmentData?.fullName}`}
                                                            />
                                                        ) : (
                                                            <Image
                                                                className='w-full h-full rounded-full'
                                                                src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"}
                                                                width={500}
                                                                height={300}
                                                                alt={`${appoinmentData?.fullName}`}
                                                            />
                                                        )
                                                    }
                                                </div>
                                                <div className='flex flex-col'>
                                                    <p>{appoinmentData?.doctorInfo?.doctor_name}</p>
                                                    <p>{appoinmentData?.doctorInfo?.department}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={`${appoinmentData?.status === "Success" && "text-[#307bc4] border-[#307bc4]"} ${appoinmentData?.status === "Pending" && "text-[#c4b530] border-[#c4b530]"} border rounded-full p-2 w-20`}>
                                                {appoinmentData?.status || "N/A"}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className=" m-1">
                                                    <CiMenuKebab className='text-2xl' />
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                    <li><p>Details</p></li>
                                                    <li><p>Edit</p></li>
                                                    <li><p>Delete</p></li>
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

export default AppoinmentDashboard