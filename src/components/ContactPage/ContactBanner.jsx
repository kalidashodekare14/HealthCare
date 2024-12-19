import Link from 'next/link'
import React from 'react'
// import banner from ''

const ContactBanner = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center space-y-3  mb-10 h-72 bg-about_banner bg-no-repeat bg-center bg-cover'>
                <h1 className='text-3xl font-poppins text-white font-bold'>Blog Page</h1>
                <div className='flex items-center gap-2 text-xl text-white'>
                    <Link href={"/"}> <p className='hover:text-[#307bc4]'>Home</p></Link>
                    <span>/</span>
                    <p className='text-[#18978d] drop-shadow-md'>Contact</p>
                </div>
            </div>
        </div>
    )
}

export default ContactBanner