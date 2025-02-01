"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import rb from '../../../public/image/rb.png'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import Swal from 'sweetalert2'


const ResetPassword = () => {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [resetPassLoading, setResetPassLoading] = useState(false)
    const router = useRouter()
    const [isError, setIsError] = useState("")

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setResetPassLoading(true)
            const resetData = {
                token: token,
                password: data.password
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/api`, resetData)
            console.log(res.data)
            if (res.data.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: 'success',
                    title: "Your password changed",
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push('/signin')
            }
        } catch (error) {
            console.log(error)
            if (error.response) {
                setIsError(error.response.data.message)
            }
        } finally {
            setResetPassLoading(false)
        }
    }

    return (
        <div className='h-[1000px] lg:h-[600px]  flex justify-center items-center'>
            <div className='flex flex-col lg:flex-row items-center lg:w-[60%] m-auto'>
                <div className='lg:w-[110%]'>
                    <Image className='w-full h-96' src={rb} width={500} height={300} alt="image" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full border p-5 space-y-2 '>
                    <h1 className='text-center text-4xl font-rubik'>Reset Password</h1>
                    <div className='flex flex-col gap-2 font-rubik'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="">Password</label>
                            <p className='text-red-500'>{isError}</p>
                        </div>
                        <input {...register("password", { required: true })} className='input input-bordered' type="text" placeholder='Password' />
                        {errors.email && <span className='text-red-500'>Password is Required!</span>}
                    </div>
                    <div className='flex justify-center items-center font-rubik'>
                        <button type='submit' className='btn rounded-none w-32 bg-[#307bc4] text-white'>
                            {
                                resetPassLoading ? (
                                    <RotatingLines
                                        visible={true}
                                        height="20"
                                        width="20"
                                        strokeColor='white'
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        ariaLabel="rotating-lines-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        className="text-white "
                                    />
                                ) : (
                                    "Next"
                                )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword