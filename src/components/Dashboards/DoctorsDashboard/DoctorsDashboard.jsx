"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { RotatingLines } from 'react-loader-spinner'

const DoctorsDashboard = () => {

    const [rejectLoading, setRejectLoading] = useState(false)

    const { data: doctorsData = [], refetch, isLoading: doctorsLoading } = useQuery({
        queryKey: ["doctorsData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors/api`)
            return res.data
        }
    })

    console.log(doctorsData)

    if (doctorsLoading) {
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


    const handleReject = async (id) => {
        try {
            setRejectLoading(true)
            const rejectRes = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors/api/status-reject?id=${id}`)
            console.log(rejectRes.data)
            if (rejectRes.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Status reject successfuly",
                    icon: "success",
                    draggable: true
                });
                refetch()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setRejectLoading(false)
        }
    }

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
                <div className="overflow-x-auto  bg-white">
                    <table className="table font-rubik">
                        {/* head */}
                        <thead>
                            <tr className='text-[15px]'>
                                <th>Doctor Info</th>
                                <th>Specialization</th>
                                <th>Experience</th>
                                <th>Available Date</th>
                                <th>Time and slots</th>
                                <th>Contact Us</th>
                                <th>
                                    <div>
                                        {
                                            rejectLoading && (
                                                <RotatingLines
                                                    visible={true}
                                                    height="40"
                                                    width="40"
                                                    color="grey"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    ariaLabel="rotating-lines-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                />
                                            )
                                        }
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctorsData.map(doctor => (
                                    <tr key={doctor._id}>
                                        <td>
                                            <div className='flex items-center gap-3'>
                                                <div>
                                                    {
                                                        doctor?.image ? (
                                                            <Image
                                                                className='w-14 h-14 rounded-full'
                                                                src={doctor?.image}
                                                                width={500}
                                                                height={300}
                                                                alt='doctor picture'
                                                            />
                                                        ) : (
                                                            <Image
                                                                className='w-14 h-14 rounded-full'
                                                                src={`https://i.ibb.co.com/WcTWxsN/nav-img.png`}
                                                                width={500}
                                                                height={300}
                                                                alt='doctor picture'
                                                            />
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <p>{doctor?.name || "N/A"}</p>
                                                    <p>{doctor?.patiend_id || "N/A"}</p>
                                                </div>
                                            </div>

                                        </td>
                                        <td>{doctor?.professional_information?.specialization || "N/A"}</td>
                                        <td>{doctor?.professional_information?.experience || "N/A"} Year</td>
                                        <td>
                                            {
                                                doctor?.service_details?.available_date ? (
                                                    <div className='space-y-2'>
                                                        {
                                                            doctor?.service_details?.available_date?.map((date, index) => (
                                                                <p className='' key={index}>{new Date(date).toLocaleDateString()}</p>
                                                            ))
                                                        }
                                                    </div>
                                                ) : (
                                                    <p>N/A</p>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                doctor?.service_details?.time_and_slots[0] ? (
                                                    <div className='flex items-center gap-2'>
                                                        <p>{doctor?.service_details?.time_and_slots[0].start}</p>
                                                        <span>-</span>
                                                        <p>{doctor?.service_details?.time_and_slots[0].end}</p>
                                                    </div>
                                                ) : (
                                                    <p>N/A</p>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <div>
                                                <p>{doctor?.email}</p>
                                                <p>{doctor?.phone_number}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className=" m-1">
                                                    <CiMenuKebab className='text-2xl' />
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                    <li>
                                                        <p>Details</p>
                                                    </li>
                                                    <li onClick={() => handleReject(doctor?._id)} className='bg-red-500 text-white rounded-2xl'>
                                                        <p>Reject</p>
                                                    </li>
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