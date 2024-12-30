"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiEdit } from 'react-icons/ci'
import { FaEdit, FaSave, FaUserAlt } from 'react-icons/fa'
import { FaCircleUser, FaUser } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'

const image_hosting_key = process.env.NEXT_PUBLIC_API_KEY
console.log(image_hosting_key)
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const ProfilePage = ({ user_bio }) => {
    const [isActive, setIsActive] = useState("persoanl_infomation")
    const [personalInfoActive, setPersonalInfoActive] = useState(false)
    const [medicalInfoActive, setMedicalInfoActive] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const session = useSession()
    const sessionEmail = session?.data?.user?.email

    // console.log('is loading', imageLoading)


    const handlePersonalIntoEdit = () => {
        setPersonalInfoActive(!personalInfoActive)
    }
    const handleMedicalInfoEdit = () => {
        setMedicalInfoActive(!medicalInfoActive)
    }

    const {
        register: register1,
        handleSubmit: handlePersonalInfoSubmit,
        formState: { errors: errors1 },
    } = useForm()

    const onPersonalInfoSubmit = async (data) => {
        console.log(data)
        const personalInfo = {
            email: data.email,
            phone_number: data.phone_number,
            date_of_birth: data.date_of_birth,
            gender: data.gender,
            current_address: data.current_address
        }
        
        const res = await axios.patch(`http://localhost:3000/profile/api/personal_information?email=${sessionEmail}`, personalInfo)
        console.log(res)
        if(res.data.matchedCount > 0){
            setPersonalInfoActive(false)
        }
    }

    const {
        register: register2,
        handleSubmit: handleMedicalInfoSubmit,
        formState: { errors: errors2 },
    } = useForm()

    const onMedicalInfoSubmit = (data) => {
        console.log(data)
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
                const res = await axios.patch(`http://localhost:3000/profile/api/image_host?email=${sessionEmail}`, imageHost)
                console.log(res)

            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setImageLoading(false)
        }
    }


    return (
        <div className='lg:mx-32'>
            <div className='h-32 lg:h-80 bg-no-repeat bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: "url(https://i.postimg.cc/xjX3c21v/profile.jpg)" }}>
                <h1 className='text-4xl text-white font-rubik'>Profile</h1>
            </div>
            <div className='lg:mx-[2rem] mx-[5px] flex items-center gap-5'>
                <div onClick={() => document.querySelector('input[type="file"]').click()} className="w-32 lg:w-40 h-32 lg:h-40  rounded-full -mt-12">
                    <div>
                        {
                            user_bio?.image ? (
                                <div className='w-32 lg:w-40 h-32 lg:h-40'>
                                    <Image
                                        className='w-full h-full rounded-full'
                                        width={500}
                                        height={300}
                                        alt="Tailwind CSS Navbar component"
                                        src={user_bio.image} />
                                </div>

                            ) : (
                                <div className='relative group cursor-pointer'>
                                    <FaUser className='w-full h-full text-white rounded-full border bg-[#307bc4] p-3' />
                                    <div className='shadow-lg shadow-black opacity-0 group-hover:opacity-100 duration-100'>
                                        <h1 className='absolute top-[45%] left-[28%]  text-black text-2xl'>Upload</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <input onChange={handleImageHosting} hidden type="file" name="" id="" />
                </div>
                <div className='font-rubik'>
                    <h1 className='text-[20px] lg:text-3xl'>{user_bio?.name || 'N/A'}</h1>
                    <p>Admin</p>
                </div>
            </div>
            <div className='lg:mx-[2rem] mx-2 my-20'>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-5 items-center font-rubik'>
                    <div onClick={() => setIsActive("persoanl_infomation")} className={`cursor-pointer ${isActive === "persoanl_infomation" && "border-b-2  border-[#307bc4]"}`}>
                        <h1>Personal Information</h1>
                    </div>
                    <div onClick={() => setIsActive("medical_information")} className={`cursor-pointer ${isActive === "medical_information" && "border-b-2  border-[#307bc4]"}`}>
                        <h1>Medical Information</h1>
                    </div>
                    <div onClick={() => setIsActive("next_treatment")} className={`cursor-pointer ${isActive === "next_treatment" && "border-b-2  border-[#307bc4]"}`}>
                        <h1>Next Treatment</h1>
                    </div>
                    <div onClick={() => setIsActive("medical_record")} className={`cursor-pointer ${isActive === "medical_record" && "border-b-2  border-[#307bc4]"}`}>
                        <h1>Medical Record</h1>
                    </div>
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
                                                <button type='submit'>
                                                    <FaSave className='text-2xl cursor-pointer' />
                                                </button>
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
                                                    <input defaultValue={user_bio?.email} {...register1("email")} className='input border border-[#000] w-full' type="email" />
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
                                                    <input {...register1("phone_number")} defaultValue={user_bio?.phone_number} className='input border border-[#000] w-full' type="text" />
                                                ) : (
                                                    <div className='border p-3 rounded-lg'>
                                                        <p>{user_bio?.phone_number || 'N/A'}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-5'>
                                        <div className='flex flex-col font-rubik w-full gap-1'>
                                            <label htmlFor="">Current Address</label>
                                            {
                                                personalInfoActive ? (
                                                    <input {...register1("current_address")} defaultValue={user_bio?.current_address} className='input border border-[#000] w-full' type="text" />
                                                ) : (
                                                    <div className='border p-3 rounded-lg'>
                                                        <p>{user_bio?.current_address || 'N/A'}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='flex flex-col font-rubik w-full gap-1'>
                                            <label htmlFor="">Date Of Birth</label>
                                            {
                                                personalInfoActive ? (

                                                    <input {...register1("date_of_birth")} defaultValue={user_bio?.date_of_birth} className='input border border-[#000] w-full' type="date" placeholder='Email' />
                                                ) : (
                                                    <div className='border p-3 rounded-lg'>
                                                        <p>{user_bio?.date_of_birth || 'N/A'}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='flex flex-col font-rubik w-full gap-1'>
                                            <label htmlFor="">Gender</label>
                                            {
                                                personalInfoActive ? (
                                                    <select {...register1("gender")} defaultValue={user_bio?.gender} className="select w-full">
                                                        <option value="DEFAULT" disabled selected>Gender</option>
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
                                                <button onClick={handlePersonalIntoEdit}>
                                                    <MdCancel className='text-2xl cursor-pointer' />
                                                </button>
                                                <button type='submit'>
                                                    <FaSave className='text-2xl cursor-pointer' />
                                                </button>
                                            </div>

                                        ) : (
                                            <FaEdit onClick={handleMedicalInfoEdit} className='text-2xl cursor-pointer' />
                                        )
                                    }
                                </div>

                                <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                        <label htmlFor="">Patient ID:</label>
                                        {
                                            medicalInfoActive ? (
                                                <input {...register2("patient_id")} defaultValue={user_bio?.patiend_id} className='input border border-[#000] w-full' type="email" />
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
                                                <input {...register2("blood_group")} defaultValue={user_bio?.blood_group} className='input border border-[#000] w-full' type="text" />
                                            ) : (
                                                <div className='border p-3 rounded-lg'>
                                                    <p>{user_bio?.blood_group || 'N/A'}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                        <label htmlFor=""> Health Condition </label>
                                        {
                                            medicalInfoActive ? (
                                                <select {...register2("health_condition")} defaultValue={user_bio?.health_condition} className="select w-full">
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
                                    </div>
                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                        <label htmlFor="">Chronic Diseases History</label>
                                        {
                                            medicalInfoActive ? (
                                                <select {...register2("chronic_diseases_history")} defaultValue={user_bio?.chronic_diseases_history} className='w-full' name="cars" id="cars" multiple>
                                                    <option value="volvo">Diabetes</option>
                                                    <option value="saab">Hypertension</option>
                                                    <option value="opel">Heart Disease</option>
                                                    <option value="audi">Chronic Asthma</option>
                                                    <option value="audi">Cancer</option>
                                                </select>
                                            ) : (
                                                <div className='border p-3 rounded-lg'>
                                                    <p>{user_bio?.chronic_diseases_history || 'N/A'}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </form>
                        )
                    }

                </div>
            </div>

        </div >
    )
}

export default ProfilePage