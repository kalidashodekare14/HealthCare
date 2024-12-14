import Image from 'next/image'
import React from 'react'
import service_image from '../../../public/image/service.png'
import { FaBedPulse, FaHospitalUser, FaPrescriptionBottle, FaToolbox, FaUserDoctor } from 'react-icons/fa6'
import { FaHeartbeat } from 'react-icons/fa'
import { CiPillsBottle1 } from 'react-icons/ci'
import { GiChemicalDrop } from 'react-icons/gi'

const HealthServices = () => {
    return (
        <div className='relative h-[600px] bg-[#e8edf0]  overflow-hidden my-10'>
            <div className=' lg:mx-32 flex'>
                <div className='pt-20'>
                    <h1 className='text-3xl w-[427px] mb-10'>Ready to Serve You with Trusted Health Solutions.</h1>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className='flex gap-5'>
                            <div className='mt-[9px] w-14 h-14 text-2xl rounded-xl bg-white flex justify-center items-center'>
                                <FaToolbox />
                            </div>
                            <div className='w-[220px] space-y-1'>
                                <h1 className='text-xl font-bold'>Service & Check</h1>
                                <p>Medical competitor research startup to financial</p>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div className='mt-[9px] w-14 h-14 text-2xl rounded-xl bg-white flex justify-center items-center'>
                                <FaHospitalUser />
                            </div>
                            <div className='w-[220px] space-y-1'>
                                <h1 className='text-xl font-bold'>Medical Advices</h1>
                                <p>Medical competitor research startup to financial</p>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div className='mt-[9px] w-14 h-14 text-2xl rounded-xl bg-white flex justify-center items-center'>

                                <FaHeartbeat />
                            </div>
                            <div className='w-[220px] space-y-1'>
                                <h1 className='text-xl font-bold'>Emergency Help</h1>
                                <p>Medical competitor research startup to financial</p>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div className='mt-[9px] w-14 h-14 text-2xl rounded-xl bg-white flex justify-center items-center'>
                                <FaPrescriptionBottle />
                            </div>
                            <div className='w-[220px] space-y-1'>
                                <h1 className='text-xl font-bold'>Medical Research</h1>
                                <p>Medical competitor research startup to financial</p>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div className='mt-[9px] w-14 h-14 text-2xl rounded-xl bg-white flex justify-center items-center'>
                                <FaUserDoctor />
                            </div>
                            <div className='w-[220px] space-y-1'>
                                <h1 className='text-xl font-bold'>Qualified Doctors</h1>
                                <p>Medical competitor research startup to financial</p>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div className='mt-[9px] w-14 h-14 text-2xl rounded-xl bg-white flex justify-center items-center'>
                                <GiChemicalDrop />
                            </div>
                            <div className='w-[220px] space-y-1'>
                                <h1 className='text-xl font-bold'>Affordable Prices</h1>
                                <p>Medical competitor research startup to financial</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <svg className='absolute -top-20 -right-32' width="700" height="700" viewBox="0 0 1709 1656" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="854.5" cy="828" rx="854.5" ry="828" fill="#307BC4" />
                    </svg>
                    <Image className='absolute bottom-0 -right-5 lg:w-[45%] w-full' src={service_image} width={500} height={300} alt='Health Service' draggable={false} />
                </div>
            </div>
        </div>
    )
}

export default HealthServices