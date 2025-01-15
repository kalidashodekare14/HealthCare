"use client"
import { useQuery } from '@tanstack/react-query'
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

const image_hosting_key = process.env.NEXT_API_KEY
console.log(image_hosting_key)
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const DashboardProfile = () => {
    const [isActive, setIsActive] = useState("persoanl_infomation")
    const [personalInfoActive, setPersonalInfoActive] = useState(false)
    const [fullNameActive, setFullNameActive] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const session = useSession()
    const sessionEmail = session?.data?.user?.email

    const { data: admin_bio = [], refetch, isLoading: adminLoading } = useQuery({
        queryKey: ["admin_bio", sessionEmail],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_BASE_URL}/dashboard/profile/api`)
            console.log(res.data)
            return res.data
        }
    })


    const handlePersonalIntoEdit = () => {
        setPersonalInfoActive(!personalInfoActive)
    }

    const handleFullNameEdit = () => {
        setFullNameActive(!fullNameActive)
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
        const res = await axios.patch(`${process.env.NEXT_BASE_URL}/profile/api/personal_information?email=${sessionEmail}`, personalInfo)
        console.log(res)
        if (res.data.matchedCount > 0) {
            setPersonalInfoActive(false)
            refetch()
        }
    }



    const {
        register: register3,
        handleSubmit: handleFullNameSubmit,
        formState: { errors: errors3 },
    } = useForm()

    const onFullNameSubmit = async (data) => {
        console.log(data)
        const fullNameData = {
            name: data.name
        }
        const res = await axios.patch(`${process.env.NEXT_BASE_URL}/profile/api/fullname?email=${sessionEmail}`, fullNameData)
        console.log(res)
        if (res.data.matchedCount > 0) {
            setFullNameActive(false)
            refetch()
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
                const res = await axios.patch(`${process.env.NEXT_BASE_URL}/profile/api/image_host?email=${sessionEmail}`, imageHost)
                console.log(res)

            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setImageLoading(false)
            refetch()
        }
    }

    if (adminLoading) {
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
                                            admin_bio?.image ? (
                                                <div className='w-32 lg:w-40 h-32 lg:h-40 border-2 border-[#307bc4] rounded-full'>
                                                    <Image
                                                        className='w-full h-full rounded-full'
                                                        width={500}
                                                        height={300}
                                                        alt="Tailwind CSS Navbar component"
                                                        src={admin_bio.image} />
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
                                    <input    {...register3("name")} defaultValue={admin_bio?.name} className='input border border-[#000]' type="text" name="name" />
                                ) : (
                                    <h1 className='text-[20px] lg:text-3xl'>{admin_bio?.name || 'N/A'}</h1>
                                )
                            }
                            <div>
                                {
                                    fullNameActive ? (
                                        <div className='flex items-center gap-3'>
                                            <MdOutlineCancel onClick={handleFullNameEdit} className='text-2xl cursor-pointer' />
                                            <button type='submit'>
                                                <FaRegSave className='text-xl cursor-pointer' />
                                            </button>
                                        </div>
                                    ) : (
                                        <button>
                                            <CiEdit onClick={handleFullNameEdit} className='text-3xl cursor-pointer' />
                                        </button>
                                    )
                                }
                            </div>

                        </form>
                        <p>Admin</p>
                    </div>
                </div >
                <div className='lg:mx-[2rem] mx-2 my-10'>
                    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-5 items-center font-rubik'>
                        <div onClick={() => setIsActive("persoanl_infomation")} className={`cursor-pointer ${isActive === "persoanl_infomation" && "border-b-2  border-[#307bc4]"}`}>
                            <h1>Personal Information</h1>
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
                                                        <input defaultValue={admin_bio?.email} {...register1("email")} className='input border border-[#000] w-full' type="email" />
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{admin_bio?.email || 'N/A'}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className='flex flex-col font-rubik w-full gap-1'>
                                                <label htmlFor="">Phone Number:</label>
                                                {
                                                    personalInfoActive ? (
                                                        <input {...register1("phone_number")} defaultValue={admin_bio?.phone_number} className='input border border-[#000] w-full' type="text" />
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{admin_bio?.phone_number || 'N/A'}</p>
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
                                                        <input {...register1("current_address")} defaultValue={admin_bio?.current_address} className='input border border-[#000] w-full' type="text" />
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{admin_bio?.current_address || 'N/A'}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className='flex flex-col font-rubik w-full gap-1'>
                                                <label htmlFor="">Date Of Birth</label>
                                                {
                                                    personalInfoActive ? (

                                                        <input {...register1("date_of_birth")} defaultValue={admin_bio?.date_of_birth} className='input border border-[#000] w-full' type="date" placeholder='Email' />
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{admin_bio?.date_of_birth || 'N/A'}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className='flex flex-col font-rubik w-full gap-1'>
                                                <label htmlFor="">Gender</label>
                                                {
                                                    personalInfoActive ? (
                                                        <select {...register1("gender")} defaultValue={admin_bio?.gender || 'Gender'} className="select w-full border border-[#000]">
                                                            <option value={"Male"} >Male</option>
                                                            <option value={"Female"} >Female</option>
                                                            <option value={"Others"} >Others</option>
                                                        </select>
                                                    ) : (
                                                        <div className='border p-3 rounded-lg'>
                                                            <p>{admin_bio?.gender || 'N/A'}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )
                        }
                    </div>
                </div>

            </div >
        </div>
    )
}

export default DashboardProfile