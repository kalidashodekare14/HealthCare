"use client"
import { useState } from 'react'
import rb from '../../../public/image/rb.png'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
import { RotatingLines } from 'react-loader-spinner'

const ForgetPassword = () => {


    const [forgetPasswordLoading, setForgetPasswordLoading] = useState(false)


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setForgetPasswordLoading(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forget-password?email=${data.email}`)
            console.log(res.data)
            if (res.data.status === 200) {
                Swal.fire({
                    position: "center",
                    iconHtml: '<img src="https://i.ibb.co.com/gb0h35f4/mail.png" width="40" />',
                    title: "Check your mail",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setForgetPasswordLoading(false)
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
                        <label htmlFor="">Email</label>
                        <input {...register("email")} className='input input-bordered' type="email" placeholder='Email' />
                    </div>
                    <div className='flex justify-center items-center font-rubik'>
                        <button type='submit' className='btn rounded-none w-32 bg-[#307bc4] text-white'>
                            {
                                forgetPasswordLoading ? (
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

export default ForgetPassword