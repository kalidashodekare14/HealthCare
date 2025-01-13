"use client"
import React, { useState } from 'react'
import rb from '../../../public/image/rb.png'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import './SignUpPage.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {

    const [value, setValue] = useState()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const newUser = {
            name: data.full_name,
            email: data.email,
            phone_number: data.phone_number,
            date_of_birth: data.date_of_birth,
            gender: data.gender,
            password: data.password,
        }
        // console.log("check", newUser)
        try {
            setIsLoading(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/signup/api`, newUser)
            console.log(res)
            if (res.status === 200) {
                reset()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push('/signin')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <div className='lg:my-10  flex justify-center items-center'>
            <div className='flex flex-col lg:flex-row items-center lg:w-[60%] m-auto'>
                <div className='lg:w-[110%]'>
                    <Image className='w-full h-96' src={rb} width={500} height={300} alt="image" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full border p-5 space-y-2 '>
                    <div className='flex flex-col gap-2 w-full font-rubik'>
                        <label htmlFor="">Full Name</label>
                        <input {...register("full_name", { required: true })} className='input input-bordered w-full' type="text" placeholder='Full Name' />
                        {errors.full_name && <span className='text-red-600'>Full Name must be required</span>}
                    </div>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Phone Number</label>
                        {/* <input className='input input-bordered' type="email" placeholder='Phone Number' /> */}
                        <PhoneInput
                            className='border p-3 outline-0 rounded-md'
                            placeholder="Phone Number"
                            value={value}
                            {...register("phone_number")}
                            onChange={setValue} />
                    </div>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Email</label>
                        <input {...register("email", { required: true })} className='input input-bordered' type="email" placeholder='Email' />
                        {errors.email && <span className='text-red-600'>Full name must be required</span>}
                    </div>
                    <div className='flex items-center gap-6 w-full'>
                        <div className='flex flex-col gap-2 w-full font-rubik'>
                            <label htmlFor="">Date Of Birth</label>
                            <input {...register("date_of_birth", { required: true })} className='w-full input input-bordered rounded-none' type="date" placeholder='Email' />
                        </div>
                        <div className='mt-8 border w-full font-rubik'>
                            <select {...register("gender", { required: true })} defaultValue={"Gender"} className="select w-full">
                                <option value={"Male"} >Male</option>
                                <option value={"Female"} >Female</option>
                                <option value={"Others"} >Others</option>
                            </select>

                        </div>
                    </div>
                    {errors.date_of_birth && <span className='text-red-600'>Date of birth must be required</span>}
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Password</label>
                        <input {...register("password", { required: true })} className='input input-bordered' type="password" placeholder='Password' />
                        {errors.password && <span className='text-red-600'>Password must be required</span>}
                    </div>
                    <div className='flex justify-center items-center font-rubik'>
                        <button type='submit' className='btn rounded-none w-32 bg-[#307bc4] text-white'>
                            {
                                isLoading ? "Processing..." : "Sign Up"
                            }
                        </button>
                    </div>
                    <h1 className='space-x-2'>
                        <span>Already have an account?</span>
                        <Link href={"/signin"}>
                            <span className='text-[#307bc4]'>
                                Login
                            </span>
                        </Link>
                    </h1>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage