"use client"
import React, { useState } from 'react'
import rb from '../../../public/image/rb.png'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6'
const LoginPage = () => {

    const router = useRouter()
    const [errorHandle, setErrorHandle] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handlePasswordShow = () => {
        setIsShowPassword(!isShowPassword)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const { email, password } = data

        try {
            setIsLoading(true)
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            })
            if (res.status === 200) {
                router.push("/")
            }
            if (res.ok === false || res.status === 401) {
                setErrorHandle(true)
            }
            console.log('check login', res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

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
                        <input {...register("email", { required: true })} className='input input-bordered' type="email" placeholder='Email' />
                        {errors.email && <span className='text-red-600'>Email must be required</span>}
                    </div>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <label htmlFor="">Password</label>
                        <div className='relative w-full'>
                            <input {...register("password", { required: true })} className='input input-bordered w-full' type={isShowPassword ? "text" : "password"} placeholder='Password' />
                            <div onClick={handlePasswordShow} className='absolute top-[30%] right-3 cursor-pointer'>
                                {
                                    isShowPassword ? (
                                        <FaEyeSlash className='text-xl' />
                                    ) : (
                                        <FaRegEye className='text-xl' />
                                    )
                                }
                            </div>
                        </div>

                        {errors.email && <span className='text-red-600'>Password must be required</span>}
                    </div>
                    <div className='flex justify-center items-center font-rubik'>
                        <button type='submit' className='btn rounded-none w-32 bg-[#307bc4] text-white'>
                            {
                                isLoading ? "Processing..." : " Sign In"
                            }
                        </button>
                    </div>
                    {errorHandle && <span className='text-red-600 font-rubik'>Your email or password doesn't match.</span>}
                    <h1 className='space-x-2 font-rubik'>
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