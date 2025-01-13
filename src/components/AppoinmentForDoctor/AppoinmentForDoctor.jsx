"use client"
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './AppoinmentForDoctor.css'
import 'react-calendar/dist/Calendar.css';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import UserData from '@/hooks/UserData'
import { Controller, useForm } from 'react-hook-form'
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/tailwind-light/theme.css';
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const AppoinmentForDoctor = ({ doctorId }) => {

    const session = useSession()
    const [user_bio, refetch, userLoading] = UserData()
    const [date, setDate] = useState(null);
    const [appoinmentDate, setAppoinmentDate] = useState(null)
    const [isPayment, setIsPayment] = useState(false)
    const [isNotPayment, setIsNotPayment] = useState(false)
    const router = useRouter()

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



    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const appoinmentData = {
            fullName: data.full_name,
            address: data.address,
            date_Of_birth: data.date_of_birth,
            gender: data.gender,
            contact_number: data.phone_number,
            email: data.email,
            doctor_name: data.doctor_name,
            department: data.department,
            appoinment_date: appoinmentDate,
            user_info: session?.data?.user
        }
        if (isPayment) {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER}/appoinment/appoinment_payment`, appoinmentData)
                .then(res => {
                    const redirecUrl = res.data.paymentUrl
                    if (redirecUrl) {
                        router.replace(redirecUrl)
                    }
                    console.log(res)
                })
        }
        if (isNotPayment) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/appoinment/doctor_appoinment`, appoinmentData)
            if (res.data.acknowledged === true) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your appoinment has been submited",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    const handlePaymentCheck = () => {
        setIsPayment(!isPayment)
        if (!isPayment) {
            setIsNotPayment(false)
        }
    }

    const handleNotPaymentCheck = () => {
        setIsNotPayment(!isNotPayment)
        if (!isNotPayment) {
            setIsPayment(false)
        }
    }


    return (
        <div className='flex justify-center items-center bg-[#e8edf0]'>
            <div className='lg:w-[48rem] bg-white p-5 my-10'>
                <form onSubmit={handleSubmit(onSubmit)} className='font-rubik '>
                    <div className='my-10'>
                        <h1 className='text-2xl text-center'>Appoinment Form</h1>
                    </div>
                    <div className='border-b pb-1 mb-5'>
                        <h1 className='text-[18px]'>Personal Information</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Full Name</label>
                            <input {...register("full_name")} className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.name || "Enter your name"} type="text" />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Address</label>
                            <input {...register("address")} className='input border border-[#000] rounded-md w-full' placeholder='Enter Age' type="text" />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Date Of Birth</label>
                            <input {...register("date_of_birth")} className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.date_of_birth || "Enter your name"} type="date" />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Gender</label>
                            <select {...register("gender")} defaultValue={user_bio?.gender || "Gender"} className="select w-full border border-[#000]">
                                <option value="Male">Male</option>
                                <option value={"Female"} >Female</option>
                                <option value={"Others"} >Others</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-3 mt-5'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Contact Number</label>
                            <Controller
                                control={control}
                                name='phone_number'
                                rules={{ required: true }}
                                render={({ field: { ref, ...field } }) => (
                                    <PhoneInput
                                        {...field}
                                        country={'us'}
                                        containerClass='w-32'
                                        inputClass='p-6'
                                    />
                                )}
                            />

                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Email</label>
                            <input {...register("email")} className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.email || "Enter your name"} type="email" />
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
                                    <select {...register("doctor_name")} defaultValue={'Gender'} className="select w-full border border-[#000]">
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
                                    <select {...register("department")} defaultValue={'Gender'} className="select w-full border border-[#000]">
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
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-5'>
                        <label htmlFor="">Appointment Date</label>
                        <div className="card flex justify-content-center border">
                            <Calendar className='font-rubik' value={appoinmentDate} onChange={(e) => setAppoinmentDate(e.value)} inline showWeek />
                        </div>
                    </div>
                    <div className='my-10'>
                        {/* <p>If you want to make a payment, click on "Payment Checkout". If you don't want to, click on "Default Submit".</p> */}
                        <div className='flex items-center gap-5'>
                            <div className='flex items-center gap-2'>
                                <input onChange={handlePaymentCheck} checked={isPayment} type="checkbox" className="checkbox" />
                                <span>Will you payment?</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input onChange={handleNotPaymentCheck} checked={isNotPayment} type="checkbox" className="checkbox" />
                                <span>Can't payment?</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center my-5'>
                        {
                            isPayment && (
                                <button type='submit' className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] border-1 hover:border-[#307bc4] text-white'>Payment Here</button>
                            )
                        }
                        {
                            isNotPayment && (
                                <button type='submit' className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] border-1 hover:border-[#307bc4] text-white'>Appoinment Submit</button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppoinmentForDoctor