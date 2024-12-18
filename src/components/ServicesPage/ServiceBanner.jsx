import Link from 'next/link'
import React from 'react'
// import banner from ''

const ServiceBanner = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center space-y-3  mb-10 h-72 bg-about_banner bg-no-repeat bg-center bg-cover'>
                <h1 className='text-3xl font-poppins text-white font-bold'>Service Page</h1>
                <div className='flex items-center gap-2 text-xl text-white'>
                    <Link href={"/"}> <p className='hover:text-[#307bc4]'>Home</p></Link>
                    <span>/</span>
                    <p className='text-[#307bc4]'>Service</p>
                </div>
            </div>
        </div>
    )
}

export default ServiceBanner