"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const PatientAppoinment = () => {

    const session = useSession()
    const sessionEmail = session?.data?.user?.email
    const sessionRole = session?.data?.user?.role
    console.log('email check', sessionEmail)

    // doctor patient appoinment
    const { data: patientAppoinemnt = [] } = useQuery({
        queryKey: ['patientAppoinemnt', sessionEmail],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/patient-appoinment/api/appoinment-query?email=${sessionEmail}`)
            return res.data
        },
    })

    // patient appoinemnt
    const { data: myAppoinment = [] } = useQuery({
        queryKey: ['myAppoinment', sessionEmail],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/patient-appoinment/api/patient-appoinment?email=${sessionEmail}`)
            return res.data
        },
    })

    console.log('check appoinment', myAppoinment)


    return (
        <div className='lg:mx-10 h-[600px]'>
            <div className='font-rubik flex justify-center items-center my-10'>
                <h1 className='text-3xl'>Patient Appoinment</h1>
            </div>
            <div>
                {
                    sessionRole === 'doctor' && (
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
                    )
                }
                {
                    sessionRole === 'patient' && (
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className='text-[18px] bg-[#307bc4] text-white'>
                                        <th>Patient name</th>
                                        <th>Address</th>
                                        <th>Contact</th>
                                        <th>Date/Gender</th>
                                        <th>Date and Time</th>
                                        <th>Doctor</th>
                                        <th>Payment Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myAppoinment.length < 1 ? (
                                            <tr>
                                                <td colSpan={"7"}>Data is not available</td>
                                            </tr>
                                        ) : (
                                            myAppoinment.map(Apm => (
                                                <tr className='font-rubik' key={Apm._id}>
                                                    <td className='flex space-x-2'>
                                                        <div className='w-14 h-14 rounded-full'>
                                                            {
                                                                Apm?.image ? (
                                                                    <Image
                                                                        className='w-full h-full rounded-full'
                                                                        src={`${Apm?.image}`}
                                                                        width={500}
                                                                        height={300}
                                                                        alt={`${Apm?.patient_name}`}
                                                                    />
                                                                ) : (
                                                                    <Image
                                                                        className='w-full h-full rounded-full'
                                                                        src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"}
                                                                        width={500}
                                                                        height={300}
                                                                        alt={`${Apm?.patient_name}`}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                        <div className=''>
                                                            <p>{Apm?.patient_name || "N/A"}</p>
                                                            <p>{Apm?.transaction_id || "N/A"}</p>
                                                        </div>
                                                    </td>
                                                    <td>{Apm?.address || "N/A"}</td>
                                                    <td>
                                                        <div className='space-y-2'>
                                                            <p>{Apm?.email}</p>
                                                            <p>{Apm?.contact_number}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='space-y-2'>
                                                            <p>{Apm?.date_Of_birth}</p>
                                                            <p>{Apm?.gender}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='space-y-2'>
                                                            <p>{new Date(Apm?.available_time?.[0]).toLocaleDateString()}</p>
                                                            <p>{Apm?.time_slots}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flex items-center gap-2'>
                                                            <div className='w-14 h-14 rounded-full'>
                                                                {
                                                                    Apm?.doctorInfo?.doctor_image ? (
                                                                        <Image
                                                                            className='w-full h-full rounded-full'
                                                                            src={`${Apm?.doctorInfo?.doctor_image}`}
                                                                            width={500}
                                                                            height={300}
                                                                            alt={`${Apm?.fullName}`}
                                                                        />
                                                                    ) : (
                                                                        <Image
                                                                            className='w-full h-full rounded-full'
                                                                            src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"}
                                                                            width={500}
                                                                            height={300}
                                                                            alt={`${Apm?.fullName}`}
                                                                        />
                                                                    )
                                                                }
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <p>{Apm?.doctorInfo?.doctor_name}</p>
                                                                <p>{Apm?.doctorInfo?.department}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={`${Apm?.status === "Success" && 'bg-[#307bc4] p-2 text-white rounded-2xl'} ${Apm?.status === "Pending" && 'bg-yellow-500 p-2 text-white rounded-2xl'}`}>
                                                            <p>{Apm?.status}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PatientAppoinment