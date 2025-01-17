"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import Swal from 'sweetalert2'

const DashboardDoctorsRequest = () => {

    const { data: doctor_request, refetch, isLoading: doctorReqLoading } = useQuery({
        queryKey: ["doctor_request"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors-request/api`)
            return res.data
        }
    })

    console.log(doctor_request)

    const handleApproved = async (id) => {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors-request/api/status-approved?id=${id}`)
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                title: "Status Approved",
                icon: "success",
                draggable: true
            });
            refetch()
        }
    }

    const handleRejected = () => {

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
                <div className=" bg-white">
                    <table className="table font-rubik">
                        {/* head */}
                        <thead>
                            <tr className='text-[15px]'>
                                <th></th>
                                <th>Doctor Id</th>
                                <th>Doctor Name</th>
                                <th>License Number</th>
                                <th>Specialization</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctor_request?.map(doctorReq => (
                                    <tr key={doctorReq._id}>
                                        <td>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-14 h-14 rounded-full'>
                                                    {
                                                        doctorReq?.image ? (
                                                            <Image
                                                                className='w-full h-full rounded-full'
                                                                src={`${doctorReq?.image}`}
                                                                width={500}
                                                                height={300}
                                                                alt={`${doctorReq?.name}`}
                                                            />
                                                        ) : (
                                                            <Image
                                                                className='w-full h-full rounded-full'
                                                                src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"}
                                                                width={500}
                                                                height={300}
                                                                alt={`${doctorReq?.name}`}
                                                            />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{doctorReq?.patiend_id || "N/A"}</p>
                                        </td>
                                        <td>
                                            <p>{doctorReq?.name || "N/A"}</p>
                                        </td>

                                        <td>
                                            <p>{doctorReq?.professional_information?.license_number || "N/A"}</p>
                                        </td>
                                        <td>
                                            <p>{doctorReq?.professional_information?.specialization || "N/A"}</p>
                                        </td>
                                        <td>
                                            <div className={`${doctorReq?.status === "approved" && "text-[#307bc4] border-[#307bc4]"} ${doctorReq?.status === "pending" && "text-[#c4b530] border-[#c4b530]"} border rounded-full p-2 w-20`}>
                                                {doctorReq?.status || "N/A"}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex items-center gap-3 text-2xl'>
                                                <div onClick={() => handleApproved(doctorReq._id)} className='cursor-pointer border rounded-full p-2 bg-[#307bc4] text-white'>
                                                    <FaCheck />
                                                </div>
                                                <div onClick={handleRejected} className='cursor-pointer border rounded-full p-2 bg-red-500 text-white'>
                                                    <IoMdClose />
                                                </div>
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

export default DashboardDoctorsRequest