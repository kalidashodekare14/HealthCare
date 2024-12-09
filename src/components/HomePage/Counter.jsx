"use client"
import React from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { MdSupportAgent } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { FaAward } from "react-icons/fa6";
import CountUp from 'react-countup';

const Counter = () => {
  return (
    <div className='lg:mx-32 my-20 bg-[#307bc4] p-5 grid grid-cols-2 lg:grid-cols-4 gap-5'>
      <div className='flex flex-col items-center'>
        <div className='bg-white p-3 rounded-full'>
          <AiOutlineSetting className='text-4xl text-[#307bc4]' />
        </div>
        <h1 className='text-4xl text-white font-bold'>
        <CountUp start={0} end={500} duration={5} />+
        </h1>
        <p className='text-xl text-white'>Active Clients</p>
      </div>
      <div className='flex flex-col items-center'>
        <div className='bg-white p-3 rounded-full'>
          <MdSupportAgent className='text-4xl text-[#307bc4]' />
        </div>
        <h1 className='text-4xl text-white font-bold'>
        <CountUp start={0} end={20} duration={5} />K
        </h1>
        <p className='text-xl text-white'>Team Support</p>
      </div>
      <div className='flex flex-col items-center'>
        <div className='bg-white p-3 rounded-full'>
          <IoMdAnalytics className='text-4xl text-[#307bc4]' />
        </div>
        <h1 className='text-4xl text-white font-bold'>
        <CountUp start={0} end={300} duration={5} />+
        </h1>
        <p className='text-xl text-white'>Project Complete</p>
      </div>
      <div className='flex flex-col items-center'>
        <div className='bg-white p-3 rounded-full'>
          <FaAward  className='text-4xl text-[#307bc4]' />
        </div>
        <h1 className='text-4xl text-white font-bold'>
        <CountUp start={0} end={10} duration={5} />K
        </h1>
        <p className='text-xl text-white'>Award winner</p>
      </div>
    </div>
  )
}

export default Counter