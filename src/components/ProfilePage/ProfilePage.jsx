"use client"
import UserData from '@/hooks/UserData'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiEdit } from 'react-icons/ci'
import { FaEdit, FaRegSave, FaSave } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { MdCancel, MdOutlineCancel } from 'react-icons/md'
import { RotatingLines } from 'react-loader-spinner'
import Select from 'react-select';
import DatePicker from "react-multi-date-picker";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import 'react-clock/dist/Clock.css';

const image_hosting_key = process.env.NEXT_PUBLIC_API_KEY
console.log(image_hosting_key)
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const ProfilePage = () => {
    const [isActive, setIsActive] = useState("persoanl_infomation")
    const [personalInfoActive, setPersonalInfoActive] = useState(false)
    const [medicalInfoActive, setMedicalInfoActive] = useState(false)
    const [nextTreatmentActive, setNextTreatmentActive] = useState(false)
    const [fullNameActive, setFullNameActive] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const session = useSession()
    const sessionEmail = session?.data?.user?.email
    const optionHistory = [
        {
            value: 'Cancer', label: 'Cancer'
        },
        {
            value: 'Chronic Asthma', label: 'Chronic Asthma'
        },
        {
            value: 'Diabetes', label: 'Diabetes'
        },
        {
            value: 'Heart Disease', label: 'Heart Disease'
        },
        {
            value: 'Hypertension', label: 'Hypertension'
        },

    ]
    const [dates, setDates] = useState([new Date()]);
    const [timeSlots, setTimeSlots] = useState([{ start: "", end: "" }])
    const [user_bio, refetch, userLoading] = UserData()
    const [firstLoading, setFirstLoading] = useState(false)
    const [secondLoading, setSecondLoading] = useState(false)
    const [thirdLoading, setThirdLoading] = useState(false)
    const [fourLoading, setFourLoading] = useState(false)


    const handleTimeChange = (index, filed, value) => {
        const newSlots = [...timeSlots];
        newSlots[index][filed] = value;
        setTimeSlots(newSlots);
    }


    // select default value implement
    const profileData = user_bio?.chronic_diseases_history || []
    const defalutOption = optionHistory.filter(option => profileData.some(userHistory => userHistory.value === option.value))


    const handlePersonalIntoEdit = () => {
        setPersonalInfoActive(!personalInfoActive)
    }
    const handleMedicalInfoEdit = () => {
        setMedicalInfoActive(!medicalInfoActive)
    }
    const handleFullNameEdit = () => {
        setFullNameActive(!fullNameActive)
    }
    const handleNextTreatment = () => {
        setNextTreatmentActive(!nextTreatmentActive)
    }

    // form 1
    const {
        register: register1,
        handleSubmit: handlePersonalInfoSubmit,
        formState: { errors: errors1 },
    } = useForm()

    const onPersonalInfoSubmit = async (data) => {
        try {
            setFirstLoading(true)
            console.log(data)
            const personalInfo = {
                email: data.email,
                phone_number: data.phone_number,
                date_of_birth: data.date_of_birth,
                gender: data.gender,
                current_address: data.current_address
            }
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/api/personal_information?email=${sessionEmail}`, personalInfo)
            console.log(res)
            if (res.data.matchedCount > 0) {
                setPersonalInfoActive(false)
                refetch()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setFirstLoading(false)
        }




    }

    // form 2
    const {
        register: register2,
        handleSubmit: handleMedicalInfoSubmit,
        formState: { errors: errors2 },
    } = useForm()

    const onMedicalInfoSubmit = async (data) => {
        try {
            setSecondLoading(true)
            console.log(data)
            // doctor information
            const doctorInfo = {
                professional_information: {
                    license_number: data.license_number,
                    specialization: data.specialization,
                    experience: data.experience,
                    location: data.location,
                    qualification: data.qualification,
                    hospital_clinic: data.hospital_clinic,
                    department: data.department
                }
            }

            if (user_bio?.role === 'doctor') {
                const doctorRes = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/api/doctor-professional-info?email=${sessionEmail}`, doctorInfo)
                console.log(doctorRes.data)
                if (doctorRes.data.matchedCount > 0) {
                    setMedicalInfoActive(false)
                    refetch()
                }
            }

            // patient inforamtion
            const medicalInfo = {
                blood_group: data.blood_group,
                health_condition: data.health_condition,
                chronic_diseases_history: selectedOption
            }

            if (user_bio?.role === 'patient') {
                const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/api/medical_information?email=${sessionEmail}`, medicalInfo)
                console.log(res.data)
                if (res.data.matchedCount > 0) {
                    setMedicalInfoActive(false)
                    refetch()
                }
            }

        } catch (error) {
            consle.log(error)
        } finally {
            setSecondLoading(false)
        }
    }

    // form 3
    const {
        register: register3,
        handleSubmit: handleFullNameSubmit,
        formState: { errors: errors3 },
    } = useForm()

    const onFullNameSubmit = async (data) => {
        try {
            setThirdLoading(true)
            console.log(data)
            const fullNameData = {
                name: data.name
            }
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/api/fullname?email=${sessionEmail}`, fullNameData)
            console.log(res)
            if (res.data.matchedCount > 0) {
                setFullNameActive(false)
                refetch()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setThirdLoading(false)
        }
    }

    // form 4
    const {
        register: register4,
        handleSubmit: handleNextTreatmentSubmit,
        formState: { errors: errors4 },
    } = useForm()

    const onNextTreatmentSubmit = async (data) => {
        try {
            setFourLoading(true)
            console.log(data)
            const serviceDetailsInfo = {
                service_details: {
                    consultation_fee: data.consultation_fee,
                    service_type: data.service_type,
                    available_date: dates,
                    time_and_slots: timeSlots
                }
            }
            const servicesRes = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/api/service-detials?email=${sessionEmail}`, serviceDetailsInfo)
            console.log(servicesRes)
            if (servicesRes.data.matchedCount > 0) {
                setNextTreatmentActive(false)
                refetch()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setFourLoading(false)
        }
    }


    // image hosting 
    const handleImageHosting = async (event) => {
        const imageSelected = event.target.files[0]
        setImageLoading(true)
        const formData = new FormData()
        formData.append('image', imageSelected)
        try {
            const res = await fetch(`${image_hosting_api}`, {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            if (data.success) {
                const imageHost = {
                    image: data.data.url
                }
                // const email = session?.data?.user?.email
                const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/api/image_host?email=${sessionEmail}`, imageHost)
                console.log(res)

            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setImageLoading(false)
            refetch()
        }
    }

    if (userLoading) {
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
        <div className=''>
            <div className='lg:mx-32 '>
                <div className='h-32 lg:h-80 bg-no-repeat bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: "url(https://i.postimg.cc/xjX3c21v/profile.jpg)" }}>
                    <h1 className='text-4xl text-white font-rubik'>Profile</h1>
                </div>
                <div className='lg:mx-[2rem] mx-[5px] flex items-center gap-5'>
                    <div onClick={() => document.querySelector('input[type="file"]').click()} className="w-32 lg:w-40 h-32 lg:h-40  rounded-full -mt-12">
                        <div>
                            {
                                imageLoading ? (
                                    <div className='flex justify-center items-center w-32 lg:w-40 h-32 lg:h-40 bg-white border-2 border-[#307bc4] rounded-full'>
                                        <RotatingLines
                                            visible={true}
                                            height="96"
                                            width="96"
                                            color="#307bc4"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            ariaLabel="rotating-lines-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        {
                                            user_bio?.image ? (
                                                <div className='w-32 lg:w-40 h-32 lg:h-40 border-2 border-[#307bc4] rounded-full'>
                                                    <Image
                                                        className='w-full h-full rounded-full'
                                                        width={500}
                                                        height={300}
                                                        alt="Tailwind CSS Navbar component"
                                                        src={user_bio.image} />
                                                </div>

                                            ) : (
                                                <div className='relative group cursor-pointer border-2 border-[#307bc4] rounded-full'>
                                                    <FaUser className='w-full h-full text-white rounded-full border bg-[#307bc4] p-3' />
                                                    <div className='shadow-lg shadow-black opacity-0 group-hover:opacity-100 duration-100'>
                                                        <h1 className='absolute top-[45%] left-[28%]  text-black text-2xl'>Upload</h1>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )

                            }
                        </div>
                        <input onChange={handleImageHosting} hidden type="file" name="" id="" />
                    </div>
                    <div className='font-rubik'>
                        <form onSubmit={handleFullNameSubmit(onFullNameSubmit)} className='flex items-center gap-3'>
                            {
                                fullNameActive ? (
                                    <input    {...register3("name")} defaultValue={user_bio?.name} className='input border border-[#000]' type="text" name="name" />
                                ) : (
                                    <h1 className='text-[20px] lg:text-3xl'>{user_bio?.name || 'N/A'}</h1>
                                )
                            }
                            <div>
                                {
                                    fullNameActive ? (
                                        <div className='flex items-center gap-3'>
                                            <MdOutlineCancel onClick={handleFullNameEdit} className='text-2xl cursor-pointer' />
                                            {
                                                thirdLoading ? (
                                                    <RotatingLines
                                                        visible={true}
                                                        height="30"
                                                        width="30"
                                                        color="grey"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        ariaLabel="rotating-lines-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                    />
                                                ) : (
                                                    <button type='submit'>
                                                        <FaRegSave className='text-xl cursor-pointer' />
                                                    </button>
                                                )
                                            }

                                        </div>
                                    ) : (
                                        <button>
                                            <CiEdit onClick={handleFullNameEdit} className='text-3xl cursor-pointer' />
                                        </button>
                                    )
                                }
                            </div>

                        </form>
                        <p>{user_bio?.role}</p>
                    </div>
                </div >
                <div className='lg:mx-[2rem] mx-2 my-20'>
                    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-5 items-center font-rubik'>
                        <div onClick={() => setIsActive("persoanl_infomation")} className={`cursor-pointer ${isActive === "persoanl_infomation" && "border-b-2  border-[#307bc4]"}`}>
                            <h1>Personal Information</h1>
                        </div>
                        <div onClick={() => setIsActive("medical_information")} className={`cursor-pointer ${isActive === "medical_information" && "border-b-2  border-[#307bc4]"}`}>
                            {
                                user_bio?.role === "doctor" ? (
                                    <h1>Professional Information</h1>
                                ) : (
                                    <h1>Medical Information</h1>
                                )
                            }


                        </div>
                        <div onClick={() => setIsActive("next_treatment")} className={`cursor-pointer ${isActive === "next_treatment" && "border-b-2  border-[#307bc4]"}`}>
                            {
                                user_bio?.role === "doctor" ? (
                                    <h1>Service Details</h1>
                                ) : (
                                    <h1 > Next Treatment</h1>
                                )
                            }
                        </div>
                        {
                            user_bio?.role === "doctor" ? (
                                ""
                            ) : (
                                <div onClick={() => setIsActive("medical_record")} className={`cursor-pointer ${isActive === "medical_record" && "border-b-2  border-[#307bc4]"}`}>
                                    <h1>Medical Record</h1>
                                </div>
                            )
                        }

                    </div>
                    <div className='my-10'>
                        {
                            isActive === "persoanl_infomation" && (
                                <form onSubmit={handlePersonalInfoSubmit(onPersonalInfoSubmit)} className='border p-5'>
                                    <div className='flex justify-end items-end'>
                                        {
                                            personalInfoActive ? (
                                                <div className='flex items-center gap-3'>
                                                    <button onClick={handlePersonalIntoEdit}>
                                                        <MdCancel className='text-2xl cursor-pointer' />
                                                    </button>
                                                    {
                                                        firstLoading ? (
                                                            <RotatingLines
                                                                visible={true}
                                                                height="30"
                                                                width="30"
                                                                color="grey"
                                                                strokeWidth="5"
                                                                animationDuration="0.75"
                                                                ariaLabel="rotating-lines-loading"
                                                                wrapperStyle={{}}
                                                                wrapperClass=""
                                                            />
                                                        ) : (
                                                            <button type='submit'>
                                                                <FaSave className='text-2xl cursor-pointer' />
                                                            </button>
                                                        )
                                                    }
                                                </div>

                                            ) : (
                                                <FaEdit onClick={handlePersonalIntoEdit} className='text-2xl cursor-pointer' />
                                            )
                                        }
                                    </div>
                                    <div>
                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                                            <div className='flex flex-col font-rubik w-full gap-1'>
                                                <label htmlFor="">Email:</label>
                                                {
                                                    personalInfoActive ? (
                                                        <input disabled defaultValue={user_bio?.email} {...register1("email")} className=' input border border-[#000] w-full' type="email" />
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{user_bio?.email || 'N/A'}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className='flex flex-col font-rubik w-full gap-1'>
                                                <label htmlFor="">Phone Number:</label>
                                                {
                                                    personalInfoActive ? (
                                                        <input {...register1("phone_number", { required: true })} defaultValue={user_bio?.phone_number} className='input border border-[#000] w-full' type="text" />
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{user_bio?.phone_number || 'N/A'}</p>
                                                        </div>
                                                    )
                                                }
                                                {errors1.phone_number && <span className='text-red-500'>Please Provide Number</span>}
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-5'>
                                            <div className='flex flex-col font-rubik w-full gap-1'>
                                                <label htmlFor="">Current Address</label>
                                                {
                                                    personalInfoActive ? (
                                                        <input {...register1("current_address", { required: true })} defaultValue={user_bio?.current_address} className='input border border-[#000] w-full' type="text" />
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{user_bio?.current_address || 'N/A'}</p>
                                                        </div>
                                                    )
                                                }
                                                {errors1.current_address && <span className='text-red-500'>Please provide address</span>}
                                            </div>
                                            <div className='flex flex-col font-rubik w-full gap-1'>
                                                <label htmlFor="">Date Of Birth</label>
                                                {
                                                    personalInfoActive ? (

                                                        <input {...register1("date_of_birth", { required: true })} defaultValue={user_bio?.date_of_birth} className='input border border-[#000] w-full' type="date" placeholder='Email' />
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{user_bio?.date_of_birth || 'N/A'}</p>
                                                        </div>
                                                    )
                                                }
                                                {errors1.phone_number && <span className='text-red-500'>Please Provide date of birth</span>}
                                            </div>
                                            <div className='flex flex-col font-rubik w-full gap-1'>
                                                <label htmlFor="">Gender</label>
                                                {
                                                    personalInfoActive ? (
                                                        <select {...register1("gender", { required: true })} defaultValue={user_bio?.gender || 'Gender'} className="select w-full border border-[#000]">
                                                            <option value={"Male"} >Male</option>
                                                            <option value={"Female"} >Female</option>
                                                            <option value={"Others"} >Others</option>
                                                        </select>
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{user_bio?.gender || 'N/A'}</p>
                                                        </div>
                                                    )
                                                }
                                                {errors1.phone_number && <span className='text-red-500'>Please Provide Gender</span>}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )
                        }
                        {
                            isActive === "medical_information" && (

                                <form onSubmit={handleMedicalInfoSubmit(onMedicalInfoSubmit)} className='border p-5'>
                                    <div className='flex justify-end items-end'>
                                        {
                                            medicalInfoActive ? (
                                                <div className='flex items-center gap-3'>
                                                    <button onClick={handleMedicalInfoEdit}>
                                                        <MdCancel className='text-2xl cursor-pointer' />
                                                    </button>
                                                    {
                                                        secondLoading ? (
                                                            <RotatingLines
                                                                visible={true}
                                                                height="30"
                                                                width="30"
                                                                color="grey"
                                                                strokeWidth="5"
                                                                animationDuration="0.75"
                                                                ariaLabel="rotating-lines-loading"
                                                                wrapperStyle={{}}
                                                                wrapperClass=""
                                                            />
                                                        ) : (
                                                            <button type='submit'>
                                                                <FaSave className='text-2xl cursor-pointer' />
                                                            </button>
                                                        )
                                                    }

                                                </div>

                                            ) : (
                                                <FaEdit onClick={handleMedicalInfoEdit} className='text-2xl cursor-pointer' />
                                            )
                                        }
                                    </div>
                                    {
                                        user_bio?.role === 'doctor' ? (
                                            <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Medical License Number:</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <input {...register2("license_number", { required: true })} defaultValue={user_bio?.professional_information?.license_number} className='input border border-[#000] w-full' type="text" />
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.professional_information?.license_number || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                    {errors2.license_number && <span className='text-red-500'>Please provide license number</span>}
                                                </div>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Specialization</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <select {...register2("specialization", { required: true })} defaultValue={user_bio?.professional_information?.specialization || 'Good'} className="select w-full border border-[#000]">
                                                                <option value="Cardiology">Cardiology</option>
                                                                <option value={"Orthopedics"} >Orthopedics</option>
                                                                <option value={"Dermatology"} >Dermatology</option>
                                                                <option value={"Neurology"} >Neurology</option>
                                                                <option value={"General Practitioner"} >General Practitioner</option>
                                                                <option value={"Oncology"} >Oncology</option>
                                                                <option value={"Pulmonology"} >Pulmonology</option>
                                                                <option value={"Gastroenterology"} >Gastroenterology</option>
                                                                <option value={"Plastic Surgery"} >Plastic Surgery</option>
                                                                <option value={"General Surgery"} >General Surgery</option>
                                                            </select>
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.professional_information?.specialization || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                    {errors2.specialization && <span className='text-red-500'>Please provide specialization</span>}
                                                </div>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Department</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <select {...register2("department", { required: true })} defaultValue={user_bio?.professional_information?.specialization || 'Good'} className="select w-full border border-[#000]">
                                                                <option value="Medicine">Medicine</option>
                                                                <option value={"Surgery"} >Surgery</option>
                                                                <option value={"Cardiology"} >Cardiology</option>
                                                                <option value={"Neurology"} >Neurology</option>
                                                                <option value={"Orthopedics"} >Orthopedics</option>
                                                                <option value={"Gynecology & Obstetrics"} >Gynecology & Obstetrics</option>
                                                                <option value={"Ophthalmology"} >Ophthalmology</option>
                                                                <option value={"Dermatologyy"} >Dermatology</option>
                                                                <option value={"Oncology"} >Oncology</option>
                                                                <option value={"Psychiatry"} >Psychiatry</option>
                                                                <option value={"Radiology"} >Radiology</option>
                                                            </select>
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.professional_information?.department || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                    {errors2.specialization && <span className='text-red-500'>Please provide specialization</span>}
                                                </div>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Years of Experience:</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <input {...register2("experience", { required: true })} defaultValue={user_bio?.professional_information?.experience} className='input border border-[#000] w-full' type="text" />
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.professional_information?.experience || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                    {errors2.experience && <span className='text-red-500'>Please provide experience</span>}
                                                </div>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Location:</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <input {...register2("location", { required: true })} defaultValue={user_bio?.professional_information?.location} className='input border border-[#000] w-full' type="text" />
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.professional_information?.location || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                    {errors2.experience && <span className='text-red-500'>Please provide workplace</span>}
                                                </div>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Qualification</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <input {...register2("qualification", { required: true })} defaultValue={user_bio?.professional_information?.qualification} className='input border border-[#000] w-full' type="text" />
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.professional_information?.qualification || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                    {errors2.experience && <span className='text-red-500'>Please provide qualification</span>}
                                                </div>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Hospital And Clinic</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <input {...register2("hospital_clinic")} defaultValue={user_bio?.professional_information?.hospital_clinic} className='input border border-[#000] w-full' type="text" />
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.professional_information?.hospital_clinic || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                    {errors2.hospital_clinic && <span className='text-red-500'>Please provide hospital and clinic</span>}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Patient ID:</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <input disabled {...register2("patient_id")} defaultValue={user_bio?.patiend_id} className='disabled input border border-[#000] w-full' type="email" />
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.patiend_id || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Blood Group:</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <input {...register2("blood_group", { required: true })} defaultValue={user_bio?.blood_group} className='input border border-[#000] w-full' type="text" />
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.blood_group || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                    {errors2.blood_group && <span className='text-red-500'>Please provide blood group</span>}
                                                </div>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor=""> Health Condition </label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <select {...register2("health_condition", { required: true })} defaultValue={user_bio?.health_condition || 'Good'} className="select w-full border border-[#000]">
                                                                <option value=""></option>
                                                                <option value="Good">Good</option>
                                                                <option value={"Moderate"} >Moderate</option>
                                                                <option value={"Critical"} >Critical</option>
                                                                <option value={"Recovering"} >Recovering</option>
                                                            </select>
                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                <p>{user_bio?.health_condition || 'N/A'}</p>
                                                            </div>
                                                        )
                                                    }
                                                    {errors2.health_condition && <span className='text-red-500'>Please provide health condition</span>}
                                                </div>
                                                <div className='flex flex-col font-rubik w-full gap-1'>
                                                    <label htmlFor="">Chronic Diseases History</label>
                                                    {
                                                        medicalInfoActive ? (
                                                            <div>
                                                                <Select
                                                                    isMulti
                                                                    defaultValue={defalutOption}
                                                                    options={optionHistory}
                                                                    onChange={(seleced) => setSelectedOption(seleced)}
                                                                    className="basic-multi-select"
                                                                    classNamePrefix="select"
                                                                />
                                                            </div>

                                                        ) : (
                                                            <div className='border p-3 rounded-lg'>
                                                                {
                                                                    user_bio?.chronic_diseases_history ? (
                                                                        <div>
                                                                            {
                                                                                user_bio?.chronic_diseases_history.map(dh => (
                                                                                    <p key={dh.label}>{dh.value}</p>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    ) : (
                                                                        <p>N/A</p>
                                                                    )
                                                                }

                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }

                                </form>
                            )
                        }

                        {
                            isActive === "next_treatment" && (
                                <form onSubmit={handleNextTreatmentSubmit(onNextTreatmentSubmit)} className='border p-5'>
                                    <div className='flex justify-end items-end'>
                                        {
                                            nextTreatmentActive ? (
                                                <div className='flex items-center gap-3'>
                                                    <button onClick={handleNextTreatment}>
                                                        <MdCancel className='text-2xl cursor-pointer' />
                                                    </button>
                                                    {
                                                        fourLoading ? (
                                                            <RotatingLines
                                                                visible={true}
                                                                height="30"
                                                                width="30"
                                                                color="grey"
                                                                strokeWidth="5"
                                                                animationDuration="0.75"
                                                                ariaLabel="rotating-lines-loading"
                                                                wrapperStyle={{}}
                                                                wrapperClass=""
                                                            />
                                                        ) : (
                                                            <button type='submit'>
                                                                <FaSave className='text-2xl cursor-pointer' />
                                                            </button>
                                                        )
                                                    }

                                                </div>

                                            ) : (
                                                <FaEdit onClick={handleNextTreatment} className='text-2xl cursor-pointer' />
                                            )
                                        }
                                    </div>
                                    <div>
                                        {
                                            user_bio?.role === 'doctor' ? (
                                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3'>
                                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                                        <label htmlFor="">Consultation Fee:</label>
                                                        {
                                                            nextTreatmentActive ? (
                                                                <input  {...register4("consultation_fee", { required: true })} defaultValue={user_bio?.service_details?.consultation_fee} className='disabled input border border-[#000] w-full' type="number" />
                                                            ) : (
                                                                <div className='border p-3 rounded-lg'>
                                                                    <p>{user_bio?.service_details?.consultation_fee || 'N/A'} TK</p>
                                                                </div>
                                                            )
                                                        }
                                                        {errors3.consultation_fee && <span className='text-red-500'>Please provide consulation fee</span>}
                                                    </div>
                                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                                        <label htmlFor="">Service Type</label>
                                                        {
                                                            nextTreatmentActive ? (
                                                                <select {...register4("service_type", { required: true })} defaultValue={user_bio?.service_type || 'Good'} className="select w-full border border-[#000]">
                                                                    <option value=""></option>
                                                                    <option value="Online Consultation">Online Consultation</option>
                                                                    <option value={"In-Person"} >In-Person</option>
                                                                    <option value={"Both"} >Both</option>
                                                                </select>
                                                            ) : (
                                                                <div className='border p-3 rounded-lg'>
                                                                    <p>{user_bio?.service_details?.service_type || 'N/A'}</p>
                                                                </div>
                                                            )
                                                        }
                                                        {errors3.experience && <span className='text-red-500'>Please provide service type</span>}
                                                    </div>
                                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                                        <label htmlFor="">Available Date:</label>
                                                        {
                                                            nextTreatmentActive ? (
                                                                <div className='flex items-center gap-2 max-w-56'>
                                                                    <DatePicker
                                                                        multiple
                                                                        format="MMMM DD YYYY"
                                                                        value={dates}
                                                                        onChange={setDates}
                                                                        sort
                                                                        plugins={[
                                                                            <DatePanel key={dates?.length} />
                                                                        ]}
                                                                        inputClass='p-3 border border-black w-80'
                                                                        containerClassName='w-full'
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className='border p-3 rounded-lg'>
                                                                    <p className='space-x-2'>
                                                                        {
                                                                            user_bio?.service_details?.available_date?.map((date, index) => (
                                                                                <span className='' key={index}>{new Date(date).toLocaleDateString()}</span>
                                                                            ))
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                                        <label htmlFor="">Available Time Slots:</label>
                                                        {
                                                            nextTreatmentActive ? (
                                                                <div className='flex items-center gap-2 max-w-56'>
                                                                    {
                                                                        timeSlots.map((slot, index) => (
                                                                            <div key={index} className='flex items-center'>
                                                                                <div>
                                                                                    <TimePicker
                                                                                        onChange={(value) => handleTimeChange(index, 'start', value)}
                                                                                        value={slot.start}
                                                                                        className="p-5"
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <TimePicker
                                                                                        onChange={(value) => handleTimeChange(index, 'end', value)}
                                                                                        value={slot.end}
                                                                                        className="p-5"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }

                                                                </div>
                                                            ) : (
                                                                <div className='border p-3 rounded-lg flex items-center gap-2'>
                                                                    <p>{user_bio?.service_details?.time_and_slots[0].start}</p>
                                                                    <span>-</span>
                                                                    <p>{user_bio?.service_details?.time_and_slots[0].end}</p>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>

                                                </div>
                                            )
                                        }

                                    </div>
                                </form>
                            )
                        }
                    </div>
                </div>

            </div >
        </div >
    )
}

export default ProfilePage