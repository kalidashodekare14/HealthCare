import Link from 'next/link'
import React from 'react'
import { FaCheck } from 'react-icons/fa6'

const paymentSuccess = () => {
  return (
    <div className='h-[400px] lg:mx-20 flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-5'>
        <div className='w-20 h-20 rounded-full bg-[#307ac3] flex justify-center items-center'>
          <FaCheck className='text-white text-5xl' />
        </div>
        <h1 className='font-rubik text-3xl'>Your Payment Successfuly</h1>
        <div className='flex items-center gap-5'>
          <Link href={"/"}>
            <button className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] border-1 hover:border-[#307bc4] text-white w-32'>Home</button>
          </Link>
          <Link href={""}>
            <button className='btn hover:bg-[#307bc4] bg-white text-[#307bc4]  hover:text-white border-1  border-[#307bc4]'>Check Payment</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default paymentSuccess