"use client"
import React, { useEffect, useState } from 'react'
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
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
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './AppoinmentForDoctor.css'

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
    const [isError, setIsError] = useState("")
    const [dateError, setDateError] = useState("")
    const [doctorFee, setDoctorFee] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [phoneValue, setPhoneValue] = useState(null)
    const [slotError, setSlotError] = useState("")


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
                setDoctorFee(res.data?.service_details?.consultation_fee)
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

        if (doctorName.length < 1) {
            setIsError("Please select doctor name")
            return
        } else {
            setIsError("")
        }

        if (dates.length > 1) {
            setDateError("Please select one of the dates")
            return
        } else {
            setDateError("")
        }

        if (selectedTimeSlot === null) {
            setSlotError("Please select a slot.")
            console.log('checking null')
            return
        } else {
            setSlotError("")
        }

        const appoinmentData = {
            patient_name: data.full_name,
            address: data.address,
            date_Of_birth: data.date_of_birth,
            gender: data.gender,
            contact_number: data.contact_number,
            email: data.email,
            doctorInfo: {
                doctor_image: doctorFindData?.image,
                doctor_name: doctorName,
                department: doctorFindData?.professional_information?.department,
            },
            appoinment_date: appoinmentDate,
            user_info: session?.data?.user,
            available_time: dates,
            time_slots: selectedTimeSlot,
            doctor_fee: doctorFindData?.service_details?.consultation_fee
        }

        if (isPayment) {
            try {
                console.log('is loading show')
                setIsProcessing(true)
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/api/appoinment_payment`, appoinmentData)
                const redirecUrl = res.data.paymentUrl
                if (redirecUrl) {
                    router.replace(redirecUrl)
                }
                console.log(res)
            } catch (error) {
                console.log(error)
            } finally {
                setIsProcessing(false)
            }

        }

        if (isNotPayment) {
            try {
                setIsProcessing(true)
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/appoinment/api/doctor_appoinment`, appoinmentData)
                if (res.data.acknowledged === true) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your appoinment has been submited",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsProcessing(false)
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
                            <input {...register("full_name", { required: true })} className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.name || "Enter your name"} type="text" />
                            {errors.full_name && <span className='text-red-500'>Full name must be required</span>}
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Address</label>
                            <input {...register("address", { required: true })} className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.current_address} placeholder='Enter Age' type="text" />
                            {errors.address && <span className='text-red-500'>Address must be required</span>}
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Date Of Birth</label>
                            <input {...register("date_of_birth")} className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.date_of_birth || "Enter your name"} type="date" />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Gender</label>
                            <select {...register("gender", { required: true })} defaultValue={user_bio?.gender || "Gender"} className="select w-full border border-[#000]">
                                <option value=""></option>
                                <option value="Male">Male</option>
                                <option value={"Female"} >Female</option>
                                <option value={"Others"} >Others</option>
                            </select>
                            {errors.gender && <span className='text-red-500'>Gender must be required</span>}
                        </div>
                    </div>
                    <div className='flex gap-3 mt-5'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Contact Number</label>
                            <PhoneInput
                                className='border border-[#000] p-3 outline-0 rounded-md'
                                placeholder="Phone Number"
                                value={phoneValue}
                                {...register("contact_number")}
                                onChange={setPhoneValue} />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Email</label>
                            <input {...register("email", { required: true })} className='input border border-[#000] rounded-md w-full' defaultValue={user_bio?.email || "Enter your name"} type="email" />
                            {errors.email && <span className='text-red-500'>Email must be required</span>}
                        </div>
                    </div>
                    <div className='border-b pb-1 my-5'>
                        <h1 className='text-[18px]'>Appointment Details</h1>
                    </div>
                    <div className='grid grid-cols-3 gap-5'>
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
                            {
                                isError && <span className='text-red-500'>{isError}</span>
                            }
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Department</label>
                            <div className='border border-black p-3 rounded-xl'>
                                {
                                    doctorFindData?.professional_information?.department ? (
                                        <p>
                                            {
                                                doctorFindData?.professional_information?.department
                                            }
                                        </p>
                                    ) : (
                                        <p className='text-[#7a6e6e]'>Select doctor's name</p>
                                    )
                                }

                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Doctor Fee</label>
                            <div className='border border-black p-3 rounded-xl'>
                                {
                                    doctorFee ? (
                                        <div className='flex items-center gap-1'>
                                            <p>{doctorFee}</p>
                                            <p>TK</p>
                                        </div>
                                    ) : (
                                        <p className='text-[#7a6e6e]'>Select doctor's name</p>
                                    )
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">Specialization</label>
                            <div className='border border-black p-3 rounded-xl'>
                                {
                                    doctorFindData?.professional_information?.specialization ? (
                                        <p>
                                            {
                                                doctorFindData?.professional_information?.specialization
                                            }
                                        </p>
                                    ) : (
                                        <p className='text-[#7a6e6e]'>Select doctor's name</p>
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
                                <DatePanel key={dates?.length} />
                            ]}
                            defaultValue={'Please select doctor name'}
                            inputClass='p-3 border border-black w-full'
                            containerClassName='w-full'
                            mapDays={({ date }) => {
                                const jsDate = new Date(date)
                                const isSelectedDate = dates?.some((selectedDate) => new Date(selectedDate).toDateString() === jsDate.toDateString());
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
                        {
                            dateError && <span className='text-red-500'>{dateError}</span>
                        }
                    </div>
                    <div className='my-5'>
                        <label htmlFor="">Time Slots</label>
                        {
                            timeSlots ? (
                                <div className='grid grid-cols-3 gap-5 mt-2'>
                                    {
                                        timeSlots.map((slot, index) => (
                                            <span onClick={() => handleTimeSlots(slot, index)} key={index} className={`${timeSlotsActive === index && "bg-[#317cc4] text-white"} cursor-pointer border p-2 text-center`}>{slot}</span>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p>Not Time Slots</p>
                            )
                        }
                        {
                            slotError && <span className='text-red-500'>{slotError}</span>
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
                                <button type='submit' className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] border-1 hover:border-[#307bc4] text-white'>
                                    {
                                        isProcessing ? "Processing..." : "Payment Here"
                                    }
                                </button>
                            )
                        }
                        {
                            isNotPayment && (
                                <button type='submit' className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] border-1 hover:border-[#307bc4] text-white'>
                                    {
                                        isProcessing ? "Processing..." : "Payment Here"
                                    }
                                </button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppoinmentForDoctor