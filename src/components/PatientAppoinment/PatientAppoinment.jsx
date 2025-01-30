"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'

const PatientAppoinment = () => {

    const session = useSession()
    const sessionEmail = session?.data?.user?.email
    console.log('email check', sessionEmail)

    const { data: patientAppoinemnt = [] } = useQuery({
        queryKey: ['patientAppoinemnt', sessionEmail],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/patient-appoinment/api/appoinment-query?email=${sessionEmail}`)
            return res.data
        },
    })

    console.log('check data', patientAppoinemnt)

    return (
        <div className='lg:mx-10 h-[600px]'>
            <div className='font-rubik flex justify-center items-center my-10'>
                <h1 className='text-3xl'>Patient Appoinment</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-[18px] bg-[#307bc4] text-white'>
                                <th></th>
                                <th>Patient name</th>
                                <th>Address</th>
                                <th>DOB and gender</th>
                                <th>Contact</th>
                                <th>Date and time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patientAppoinemnt.length < 1 ? (
                                    <tr>
                                        <td colSpan={"7"}>Data is not available</td>
                                    </tr>
                                ) : (
                                    patientAppoinemnt.map(appoinment => (
                                        <tr className='font-rubik' key={appoinment._id}>
                                            <td></td>
                                            <td>{appoinment?.patient_name || "N/A"}</td>
                                            <td>{appoinment?.address || "N/A"}</td>
                                            <td>
                                                <div className='space-y-2'>
                                                    <p>{appoinment?.date_Of_birth}</p>
                                                    <p>{appoinment?.gender}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='space-y-2'>
                                                    <p>{appoinment?.email}</p>
                                                    <p>{appoinment?.contact_number}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='space-y-2'>
                                                    <p>{new Date(appoinment?.available_time?.[0]).toLocaleDateString()}</p>
                                                    <p>{appoinment?.time_slots}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={`${appoinment?.status === "Success" && 'bg-[#307bc4] p-2 text-white rounded-2xl'} ${appoinment?.status === "Pending" && 'bg-yellow-500 p-2 text-white rounded-2xl'}`}>
                                                    <p>{appoinment?.status}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PatientAppoinment