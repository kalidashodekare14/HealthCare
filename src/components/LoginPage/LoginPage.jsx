"use client"
import React from 'react'
import rb from '../../../public/image/rb.png'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

const LoginPage = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className='h-[1000px] lg:h-[600px]  flex justify-center items-center'>
            <div className='flex flex-col lg:flex-row items-center lg:w-[60%] m-auto'>
                <div className='lg:w-[110%]'>
                    <Image className='w-full h-96' src={rb} width={500} height={300} alt="image" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full border p-5 space-y-2 '>
                    <h1 className='text-center text-4xl font-rubik'>Sign In</h1>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Email</label>
                        <input {...register("email")} className='input input-bordered' type="email" placeholder='Email' />
                    </div>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Password</label>
                        <input {...register("password")} className='input input-bordered' type="password" placeholder='Password' />
                    </div>
                    <div className='flex justify-center items-center font-rubik'>
                        <button type='submit' className='btn rounded-none w-32 bg-[#307bc4] text-white'>Sign In</button>
                    </div>
                    <h1 className='space-x-2'>
                        <span>Create your account!</span>
                        <Link href={"/signup"}>
                            <span className='text-[#307bc4]'>
                                SignUp
                            </span>
                        </Link>
                    </h1>
                </form>
            </div>
        </div>
    )
}

export default LoginPage