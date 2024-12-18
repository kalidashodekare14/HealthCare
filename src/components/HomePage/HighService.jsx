import React from 'react'
import { FaToolbox } from "react-icons/fa";
import { MdBloodtype } from 'react-icons/md';
import { GiLeatherVest } from "react-icons/gi";
import { FaBrain } from 'react-icons/fa6';
import { IoIosPulse } from 'react-icons/io';
import { FaRegEye } from "react-icons/fa";
import { FaTooth } from "react-icons/fa";
import { FaLungs } from "react-icons/fa";

const HighService = () => {
  return (
    <div className='lg:mx-10 my-20'>
      <h1 className='text-4xl font-bold mb-10 font-poppins'>High quality service</h1>

      <div className='font-rubik grid grid-cols-1 lg:grid-cols-4 gap-5'>
        <div className='overflow-hidden relative group bg-white shadow-2xl rounded-lg p-5'>
          <div className='absolute z-10 left-0 top-0 opacity-0 duration-300 group-hover:opacity-100 rounded-lg bg-checkUp w-full h-full bg-no-repeat bg-center bg-cover'></div>
          <div className='relative z-20 space-y-3'>
            <div className='bg-[#307bc4] group-hover:bg-white w-14 h-14 rounded-full flex justify-center items-center text-2xl text-white'>
              <FaToolbox className='group-hover:text-[#307bc4]' />
            </div>
            <h1 className='text-2xl font-bold group-hover:text-white'>Pharmacology</h1>
            <p className='text-[#5c5a5a] group-hover:text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, excepturi.</p>
          </div>
        </div>
        <div className='relative group bg-white shadow-2xl rounded-lg p-5'>
          <div className='absolute z-10 left-0 top-0 opacity-0 duration-300 group-hover:opacity-100 rounded-lg bg-checkUp w-full h-full bg-no-repeat bg-center bg-cover'></div>
          <div className='relative z-20 space-y-3'>
            <div className='bg-[#307bc4] group-hover:bg-white w-14 h-14 rounded-full flex justify-center items-center text-2xl text-white'>
              <MdBloodtype className='group-hover:text-[#307bc4]' />
            </div>
            <h1 className='text-2xl font-bold group-hover:text-white'>Hematology</h1>
            <p className='text-[#5c5a5a] group-hover:text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, excepturi.</p>
          </div>
        </div>
        <div className='relative group bg-white shadow-2xl rounded-lg p-5'>
          <div className='absolute z-10 left-0 top-0 opacity-0 duration-300 group-hover:opacity-100 rounded-lg bg-checkUp w-full h-full bg-no-repeat bg-center bg-cover'></div>
          <div className='relative z-20 space-y-3'>
            <div className='bg-[#307bc4] group-hover:bg-white w-14 h-14 rounded-full flex justify-center items-center text-2xl text-white'>
              <GiLeatherVest className='group-hover:text-[#307bc4]' />
            </div>
            <h1 className='text-2xl font-bold group-hover:text-white'>Dermatology</h1>
            <p className='text-[#5c5a5a] group-hover:text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, excepturi.</p>
          </div>
        </div>
        <div className='relative group bg-white shadow-2xl rounded-lg p-5'>
          <div className='absolute z-10 left-0 top-0 opacity-0 duration-300 group-hover:opacity-100 rounded-lg bg-checkUp w-full h-full bg-no-repeat bg-center bg-cover'></div>
          <div className='relative z-20 space-y-3'>
            <div className='bg-[#307bc4] group-hover:bg-white w-14 h-14 rounded-full flex justify-center items-center text-2xl text-white'>
              <FaBrain className='group-hover:text-[#307bc4]' />
            </div>
            <h1 className='text-2xl font-bold group-hover:text-white'>Neurology</h1>
            <p className='text-[#5c5a5a] group-hover:text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, excepturi.</p>
          </div>
        </div>
        <div className='relative group bg-white shadow-2xl rounded-lg p-5'>
          <div className='absolute z-10 left-0 top-0 opacity-0 duration-300 group-hover:opacity-100 rounded-lg bg-checkUp w-full h-full bg-no-repeat bg-center bg-cover'></div>
          <div className='relative z-20 space-y-3'>
            <div className='bg-[#307bc4] group-hover:bg-white w-14 h-14 rounded-full flex justify-center items-center text-2xl text-white'>
              <IoIosPulse className='group-hover:text-[#307bc4]' />
            </div>
            <h1 className='text-2xl font-bold group-hover:text-white'>Pediatrics</h1>
            <p className='text-[#5c5a5a] group-hover:text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, excepturi.</p>
          </div>
        </div>
        <div className='relative group bg-white shadow-2xl rounded-lg p-5'>
          <div className='absolute z-10 left-0 top-0 opacity-0 duration-300 group-hover:opacity-100 rounded-lg bg-checkUp w-full h-full bg-no-repeat bg-center bg-cover'></div>
          <div className='relative z-20 space-y-3'>
            <div className='bg-[#307bc4] group-hover:bg-white w-14 h-14 rounded-full flex justify-center items-center text-2xl text-white'>
              <FaRegEye className='group-hover:text-[#307bc4]' />
            </div>
            <h1 className='text-2xl font-bold group-hover:text-white'>Ophthalmology</h1>
            <p className='text-[#5c5a5a] group-hover:text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, excepturi.</p>
          </div>
        </div>
        <div className='relative group bg-white shadow-2xl rounded-lg p-5'>
          <div className='absolute z-10 left-0 top-0 opacity-0 duration-300 group-hover:opacity-100 rounded-lg bg-checkUp w-full h-full bg-no-repeat bg-center bg-cover'></div>
          <div className='relative z-20 space-y-3'>
            <div className='bg-[#307bc4] group-hover:bg-white w-14 h-14 rounded-full flex justify-center items-center text-2xl text-white'>
              <FaTooth className='group-hover:text-[#307bc4]' />
            </div>
            <h1 className='text-2xl font-bold group-hover:text-white'>Dental Care</h1>
            <p className='text-[#5c5a5a] group-hover:text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, excepturi.</p>
          </div>
        </div>
        <div className='relative group bg-white shadow-2xl rounded-lg p-5'>
          <div className='absolute z-10 left-0 top-0 opacity-0 duration-300 group-hover:opacity-100 rounded-lg bg-checkUp w-full h-full bg-no-repeat bg-center bg-cover'></div>
          <div className='relative z-20 space-y-3'>
            <div className='bg-[#307bc4] group-hover:bg-white w-14 h-14 rounded-full flex justify-center items-center text-2xl text-white'>
              <FaLungs className='group-hover:text-[#307bc4]' />
            </div>
            <h1 className='text-2xl font-bold group-hover:text-white'>Cardiology</h1>
            <p className='text-[#5c5a5a] group-hover:text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, excepturi.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighService