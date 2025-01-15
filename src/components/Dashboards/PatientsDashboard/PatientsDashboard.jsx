"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { RotatingLines } from 'react-loader-spinner'

const PatientsDashboard = () => {

    const { data: patientsData = [], isLoading: patientLoading } = useQuery({
        queryKey: ["patientsData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_SERVER_URL}/dashboard/patients/api`)
            return res.data
        }
    })
    console.log(patientsData)

    if (patientLoading) {
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
                                <th></th>
                                <th>ID</th>
                                <th>Patient Name</th>
                                <th>Health Condition</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patientsData.map(patient => (
                                    <tr key={patient._id}>
                                        <th>
                                            {
                                                patient?.image ? (
                                                    <Image
                                                        className='w-14 h-14 rounded-full'
                                                        src={patient?.image}
                                                        width={500}
                                                        height={300}
                                                        alt='doctor picture'
                                                    />
                                                ) : (
                                                    <Image
                                                        className='w-14 h-14 rounded-full'
                                                        src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"}
                                                        width={500}
                                                        height={300}
                                                        alt='doctor picture'
                                                    />
                                                )
                                            }

                                        </th>
                                        <td>{patient?.patiend_id || "N/A"}</td>
                                        <td>{patient?.name || "N/A"}</td>
                                        <td>{patient?.health_condition || "N/A"}</td>
                                        <td>{patient?.phone_number || "N/A"}</td>
                                        <td>{patient?.email || "N/A"}</td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className=" m-1">
                                                    <CiMenuKebab className='text-2xl' />
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
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

export default PatientsDashboard