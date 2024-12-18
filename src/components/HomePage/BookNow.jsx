import React from 'react'
import { MdDateRange } from "react-icons/md";
import { PiStethoscope } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";

const BookNow = () => {
    return (
        <div className='-mt-10 z-20 relative mb-10 '>
            <div className='font-rubik grid grid-cols-2 lg:grid-cols-4 gap-2 lg:w-[80%] m-auto bg-white shadow-lg p-5'>
                <div className='flex items-center gap-2'>
                    <div className='bg-[#307bc4] p-2 text-white rounded-full'>
                        <MdDateRange className='text-2xl' />
                    </div>
                    <div>
                        <h1 className='font-[500]'>Date</h1>
                        <p>August 23, 2024</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-[#307bc4] p-2 text-white rounded-full'>
                        <PiStethoscope className='text-2xl' />
                    </div>
                    <div>
                        <h1 className='font-[500]'>Specialization</h1>
                        <select className='lg:p-[6px]'>
                            <option>Cardiology</option>
                            <option>Dermatology</option>
                            <option>Neurology</option>
                            <option>Pediatrics</option>
                            <option>Ophthalmology</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-[#307bc4] p-2 text-white rounded-full'>
                        <CiLocationOn className='text-2xl' />
                    </div>
                    <div>
                        <h1 className='font-[500]'>Location</h1>
                        <p>New, York, US</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <button className='btn bg-[#307bc4] text-white w-40 rounded-2xl'>Book Now <FaArrowRight /></button>
                </div>
            </div>
        </div>
    )
}

export default BookNow