"use client"
import React, { useState } from 'react'
import rb from '../../../public/image/rb.png'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import './SignUpPage.css'

const SignUpPage = () => {

    const [value, setValue] = useState()

    return (
        <div className='h-[1000px] lg:h-[600px]  flex justify-center items-center'>
            <div className='flex flex-col lg:flex-row items-center lg:w-[60%] m-auto'>
                <div className='lg:w-[110%]'>
                    <Image className='w-full h-96' src={rb} width={500} height={300} alt="image" />
                </div>
                <div className='w-full border p-5 space-y-2 '>
                    <div className='flex flex-col gap-2 w-full font-rubik'>
                        <label htmlFor="">Full Name</label>
                        <input className='input input-bordered w-full' type="text" placeholder='Full Name' />
                    </div>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Phone Number</label>
                        {/* <input className='input input-bordered' type="email" placeholder='Phone Number' /> */}
                        <PhoneInput
                            className='border p-3 outline-0 rounded-md'
                            placeholder="Phone Number"
                            value={value}
                            onChange={setValue} />
                    </div>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Email</label>
                        <input className='input input-bordered' type="email" placeholder='Email' />
                    </div>
                    <div className='flex items-center gap-6 w-full'>
                        <div className='flex flex-col gap-2 w-full font-rubik'>
                            <label htmlFor="">Date Of Birth</label>
                            <input className='w-full input input-bordered rounded-none' type="date" placeholder='Email' />
                        </div>
                        <div className='mt-8 border w-full font-rubik'>
                            <select className="select w-full">
                                <option value={"Gender"} disabled selected>Gender</option>
                                <option value={"Male"} >Male</option>
                                <option value={"Female"} >Female</option>
                                <option value={"Others"} >Others</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Password</label>
                        <input className='input input-bordered' type="password" placeholder='Password' />
                    </div>
                    <div className='flex justify-center items-center font-rubik'>
                        <button className='btn rounded-none w-32 bg-[#307bc4] text-white'>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage