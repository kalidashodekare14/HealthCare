"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FaEdit } from 'react-icons/fa'

const ProfilePage = () => {
    const [isActive, setIsActive] = useState("persoanl_infomation")
    const [isEditActive, setIsEditActive] = useState(false)

    const handleIntoEdit = () => {
        setIsEditActive(!isEditActive)
    }

    return (
        <div className='lg:mx-32'>
            <div className='h-32 lg:h-80 bg-no-repeat bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: "url(https://i.postimg.cc/xjX3c21v/profile.jpg)" }}>
                <h1 className='text-4xl text-white font-rubik'>Profile</h1>
            </div>
            <div className='lg:mx-[2rem] mx-[5px] flex items-center gap-5'>
                <div className="w-32 lg:w-40 h-32 lg:h-40  rounded-full -mt-12">
                    <Image
                        className='w-full h-full rounded-full'
                        width={500}
                        height={300}
                        alt="Tailwind CSS Navbar component"
                        src="https://i.postimg.cc/8cTGXHcD/1200px-Outdoors-man-portrait-cropped.jpg" />
                </div>
                <div className='font-rubik'>
                    <h1 className='text-[20px] lg:text-3xl'>Kalidash Odekare</h1>
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
                            <div className='border p-5'>
                                <div className='flex justify-end items-end'>
                                    <FaEdit onClick={handleIntoEdit} className='text-2xl cursor-pointer' />
                                </div>
                                <div>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                                        <div className='flex flex-col font-rubik w-full gap-1'>
                                            <label htmlFor="">Email:</label>
                                            {
                                                isEditActive ? (
                                                    <input className='input border border-[#000] w-full' type="email" />
                                                ) : (
                                                    <div className='border p-3 rounded-lg'>
                                                        <p>kalidashodekare14@gmail.com</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='flex flex-col font-rubik w-full gap-1'>
                                            <label htmlFor="">Phone Number:</label>
                                            {
                                                isEditActive ? (
                                                    <input className='input border border-[#000] w-full' type="text" />
                                                ) : (
                                                    <div className='border p-3 rounded-lg'>
                                                        <p>+8801728659562</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-5'>
                                        <div className='flex flex-col font-rubik w-full gap-1'>
                                            <label htmlFor="">Current Address</label>
                                            {
                                                isEditActive ? (
                                                    <input className='input border border-[#000] w-full' type="text" />
                                                ) : (
                                                    <div className='border p-3 rounded-lg'>
                                                        <p>Bairbari,Birgonj,Dinajpur</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='flex flex-col font-rubik w-full gap-1'>
                                            <label htmlFor="">Date Of Birth</label>
                                            {
                                                isEditActive ? (

                                                    <input className='input border border-[#000] w-full' type="date" placeholder='Email' />
                                                ) : (
                                                    <div className='border p-3 rounded-lg'>
                                                        <p>10/1/2004</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className='flex flex-col font-rubik w-full gap-1'>
                                            <label htmlFor="">Gender</label>
                                            {
                                                isEditActive ? (
                                                    <select defaultValue={"Default"} className="select w-full">
                                                        <option value="DEFAULT" disabled selected>Gender</option>
                                                        <option value={"Male"} >Male</option>
                                                        <option value={"Female"} >Female</option>
                                                        <option value={"Others"} >Others</option>
                                                    </select>
                                                ) : (
                                                    <div className='border p-3 rounded-lg'>
                                                        <p>Male</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        isActive === "medical_information" && (
                            <div className='border p-5'>
                                <div className='flex justify-end items-end'>
                                    <FaEdit onClick={handleIntoEdit} className='text-2xl cursor-pointer' />
                                </div>
                                <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                        <label htmlFor="">Patient ID:</label>
                                        {
                                            isEditActive ? (
                                                <input className='input border border-[#000] w-full' type="email" />
                                            ) : (
                                                <div className='border p-3 rounded-lg'>
                                                    <p>5421</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                        <label htmlFor="">Blood Group:</label>
                                        {
                                            isEditActive ? (
                                                <input className='input border border-[#000] w-full' type="text" />
                                            ) : (
                                                <div className='border p-3 rounded-lg'>
                                                    <p>A+</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                        <label htmlFor=""> Health Condition </label>
                                        {
                                            isEditActive ? (
                                                <select defaultValue={"Default"} className="select w-full">
                                                    <option value="Good">Good</option>
                                                    <option value={"Moderate"} >Moderate</option>
                                                    <option value={"Critical"} >Critical</option>
                                                    <option value={"Recovering"} >Recovering</option>
                                                </select>
                                            ) : (
                                                <div className='border p-3 rounded-lg'>
                                                    <p>Good</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='flex flex-col font-rubik w-full gap-1'>
                                        <label htmlFor="">Chronic Diseases History</label>
                                        {
                                            isEditActive ? (
                                                <select className='w-full' name="cars" id="cars" multiple>
                                                    <option value="volvo">Diabetes</option>
                                                    <option value="saab">Hypertension</option>
                                                    <option value="opel">Heart Disease</option>
                                                    <option value="audi">Chronic Asthma</option>
                                                    <option value="audi">Cancer</option>
                                                </select>
                                            ) : (
                                                <div className='border p-3 rounded-lg'>
                                                    <p>Male</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default ProfilePage