"use client"
import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './AppoinmentForDoctor.css'
import 'react-calendar/dist/Calendar.css';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import UserData from '@/hooks/UserData'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const AppoinmentForDoctor = ({ doctorId }) => {

    const session = useSession()
    const [user_bio, refetch, userLoading] = UserData()
    const [appoinmentDate, setAppoinmentDate] = useState(null)
    const [isPayment, setIsPayment] = useState(false)
    const [isNotPayment, setIsNotPayment] = useState(false)
    const router = useRouter()
    const [doctorName, setDoctorName] = useState("")
    const [doctorFindData, setdoctorFindData] = useState(null)
    const [dates, setDates] = useState([])
    const [timeSlots, setTimeSlots] = useState([])
    const [timeSlotsActive, setTimeSlotsActive] = useState(null)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)


    const handleTimeSlots = (slot, index) => {
        setTimeSlotsActive(index)
        setSelectedTimeSlot(slot)
    }



    useEffect(() => {
        const doctorFind = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/api/doctor-query?name=${doctorName}`)
                console.log(res.data)
                setdoctorFindData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (doctorName) {
            doctorFind()
        }
    }, [doctorName])


    useEffect(() => {
        const doctorAvaiableDate = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/api/doctor_get?name=${doctorName}`)
                setDates(res.data?.service_details?.available_date)
            } catch (error) {
                console.log(error)
            }
        }
        if (doctorName) {
            doctorAvaiableDate()
        }
    }, [doctorName])


    const { data: apponmentData = [] } = useQuery({
        queryKey: ["apponmentData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/api/doctor_appoinment`)
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
        // console.log(data)
        const appoinmentData = {
            patient_name: data.full_name,
            address: data.address,
            date_Of_birth: data.date_of_birth,
            gender: data.gender,
            contact_number: data.phone_number,
            email: data.email,
            doctorInfo: {
                doctor_image: doctorFindData?.image,
                doctor_name: doctorName,
                department: "serjari",
            },
            appoinment_date: appoinmentDate,
            user_info: session?.data?.user,
            available_time: dates,
            time_slots: selectedTimeSlot
        }
        if (isPayment) {
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/appoinment_payment`, appoinmentData)
                .then(res => {
                    const redirecUrl = res.data.paymentUrl
                    if (redirecUrl) {
                        router.replace(redirecUrl)
                    }
                    console.log(res)
                })
        }
        if (isNotPayment) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/doctor_appoinment`, appoinmentData)
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

    useEffect(() => {
        const fetchTimeSlots = async () => {
            try {
                const resTime = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/api/doctor-time-slots?name=${doctorName}`)
                if (resTime) {
                    const slots = generateTimeSlot(
                        resTime?.data?.startTime,
                        resTime?.data?.endTime,
                        30
                    )
                    setTimeSlots(slots)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (doctorName) {
            fetchTimeSlots()
        }

    }, [doctorName])

    const generateTimeSlot = (startTime, endTime, slotDuration) => {
        const today = new Date()
        const date = today.toISOString().split('T')[0];

        let current = new Date(`${date}T${startTime}:00`)
        let end = new Date(`${date}T${endTime}:00`)

        const slots = []
        while (current < end) {
            slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            current.setMinutes(current.getMinutes() + slotDuration)
        }
        return slots
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
                                    <select onClick={(e) => setDoctorName(e.target.value)} {...register("doctor_name")} defaultValue={'Gender'} className="select w-full border border-[#000]">
                                        <option>Please Select</option>
                                        {
                                            apponmentData?.doctorsName.map((doctorName, index) => (
                                                <option key={index} value={doctorName}>{doctorName}</option>
                                            ))
                                        }
                                    </select>
                                ) : (
                                    <p className='p-3 rounded-2xl border border-[#000]'>N/A</p>
                                )
                            }

                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Department</label>
                            <div className='border border-black p-3 rounded-xl'>
                                {
                                    doctorFindData?.department ? (
                                        <p>
                                            {
                                                doctorFindData?.department
                                            }
                                        </p>
                                    ) : (
                                        <p>Please Select Doctor Name</p>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-5'>
                        <label htmlFor="">Appointment Date</label>
                        <DatePicker
                            value={dates}
                            onChange={setDates}
                            format="MMMM DD YYYY"
                            sort
                            plugins={[
                                <DatePanel />
                            ]}
                            inputClass='p-3 border border-black w-full'
                            containerClassName='w-full'
                            mapDays={({ date }) => {
                                const jsDate = new Date(date)
                                const isSelectedDate = dates.some((selectedDate) => new Date(selectedDate).toDateString() === jsDate.toDateString());
                                return {
                                    disabled: !isSelectedDate,
                                    style: isSelectedDate ? {
                                        backgroundColor: "#0B8BE6",
                                        color: '#ffff'
                                    } : {
                                        backgroundColor: "#f5f5f5",
                                        color: '#ccc'
                                    }

                                }
                            }}
                        />
                    </div>
                    <div className='my-5'>
                        <label htmlFor="">Time Slots</label>
                        {
                            timeSlots ? (
                                <div className='grid grid-cols-3 gap-5 mt-2'>
                                    {
                                        timeSlots.map((slot, index) => (
                                            <button onClick={() => handleTimeSlots(slot, index)} key={index} className={`${timeSlotsActive === index && "bg-[#317cc4] text-white"} cursor-pointer border p-2`}>{slot}</button>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p>Not Time Slots</p>
                            )
                        }
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