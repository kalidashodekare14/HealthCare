"use client"
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './AppoinmentForDoctor.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import UserData from '@/hooks/UserData'

const AppoinmentForDoctor = ({ doctorId }) => {

    const [value, setValue] = useState(new Date())
    const session = useSession()
    const [user_bio, refetch, userLoading] = UserData()

    const { data: doctorData = [] } = useQuery({
        queryKey: ["doctorData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/appoinment/doctor_get?id=${doctorId}`)
            return res.data
        }
    })

    const { data: apponmentData = [] } = useQuery({
        queryKey: ["apponmentData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/appoinment/doctor_appoinment`)
            return res.data
        }
    })

    console.log(apponmentData)

    const availableDays = doctorData?.availability?.days
    const isTileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const dayName = date.toLocaleString("en-US", { weekday: "long" })
            return availableDays && !availableDays.includes(dayName)
        }
        return false;
    }

    console.log(availableDays)

    return (
        <div className='flex justify-center items-center bg-[#e8edf0]'>
            <div className='lg:w-[48rem] bg-white p-5 my-10'>
                <form className='font-rubik '>
                    <div className='my-10'>
                        <h1 className='text-2xl text-center'>Appoinment Form</h1>
                    </div>
                    <div className='border-b pb-1 mb-5'>
                        <h1 className='text-[18px]'>Personal Information</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Full Name</label>
                            <input className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.name || "Enter your name"} type="text" />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Age</label>
                            <input className='input border border-[#000] rounded-md w-full' placeholder='Enter Age' type="number" />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Date Of Birth</label>
                            <input className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.date_of_birth || "Enter your name"} type="date" />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Gender</label>
                            <select defaultValue={user_bio?.gender || "Gender"} className="select w-full border border-[#000]">
                                <option value="Male">Male</option>
                                <option value={"Female"} >Female</option>
                                <option value={"Others"} >Others</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-3 mt-5'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Contact Number</label>
                            <PhoneInput
                                
                                className={""}
                                country={'us'}
                                containerClass='w-32'
                                inputClass='p-6'
                            />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Email</label>
                            <input className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.email || "Enter your name"} type="email" />
                        </div>
                    </div>
                    <div className='border-b pb-1 my-5'>
                        <h1 className='text-[18px]'>Appointment Details</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Doctor Name</label>
                            {
                                apponmentData?.doctorsName ? (
                                    <select defaultValue={'Gender'} className="select w-full border border-[#000]">
                                        {
                                            apponmentData?.doctorsName.map((doctorName, index) => (
                                                <option key={index} value={doctorName}>{doctorName}</option>
                                            ))
                                        }
                                    </select>
                                ) : (
                                    <p>N/A</p>
                                )
                            }

                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Department</label>
                            {
                                apponmentData?.deparmentNames ? (
                                    <select defaultValue={'Gender'} className="select w-full border border-[#000]">
                                        {
                                            apponmentData?.deparmentNames.map((deparment, index) => (
                                                <option key={index} value={deparment}>{deparment}</option>
                                            ))
                                        }
                                    </select>
                                ) : (
                                    <p>N/A</p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Appointment Date</label>
                            <Calendar className={"font-rubik"} tileDisabled={isTileDisabled} value={value} />
                        </div>

                    </div>
                    <div className='flex justify-center items-center my-5'>
                        <button className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] border-1 hover:border-[#307bc4] text-white'>Appoinment Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppoinmentForDoctor