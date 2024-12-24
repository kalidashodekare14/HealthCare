import React from 'react'
import rb from '../../../public/image/rb.png'
import Image from 'next/image'

const signupPage = () => {
    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='flex w-[60%] m-auto'>
                <div className='w-[100%]'>
                    <Image className='w-full' src={rb} width={500} height={300} alt="image" />
                </div>
                <div className='w-full border p-5 space-y-2'>
                    <div className='flex flex-col gap-2 w-full font-rubik'>
                        <label htmlFor="">Full Name</label>
                        <input className='input input-bordered w-full' type="text" placeholder='Full Name' />
                    </div>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Phone Number</label>
                        <input className='input input-bordered' type="email" placeholder='Phone Number' />
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
                                <option disabled selected>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-center items-center font-rubik'>
                        <button className='btn rounded-none w-32'>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signupPage