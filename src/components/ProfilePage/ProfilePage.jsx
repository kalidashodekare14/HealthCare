import Image from 'next/image'
import React from 'react'

const ProfilePage = () => {
    return (
        <div className='mx-32 h-[600px]'>
            <div className='h-80 bg-no-repeat bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: "url(https://i.postimg.cc/xjX3c21v/profile.jpg)" }}>
                <h1 className='text-4xl text-white font-rubik'>Profile</h1>
            </div>
            <div className='flex items-center gap-5'>
                <div className="w-40 h-40  rounded-full -mt-12 ml-10 ">
                    <Image
                        className='w-full h-full rounded-full'
                        width={500}
                        height={300}
                        alt="Tailwind CSS Navbar component"
                        src="https://i.postimg.cc/8cTGXHcD/1200px-Outdoors-man-portrait-cropped.jpg" />
                </div>
                <div className='font-rubik'>
                    <h1 className='text-3xl'>Kalidash Odekare</h1>
                    <p>Admin</p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage