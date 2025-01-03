'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'

const PublicDoctorProfile = ({ profileId }) => {


    const { data: publicProfile = [] } = useQuery({
        queryKey: ["publicProfile", profileId],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/doctors/public_doctor_profile?id=${profileId}`)
            return res.data
        }
    })

    console.log(publicProfile)

    return (
        <div className='h-[600px]'>
            <div className='h-32 lg:h-80 bg-no-repeat bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: "url(https://i.postimg.cc/xjX3c21v/profile.jpg)" }}>
                <h1 className='text-4xl text-white font-rubik'>Doctor Profile</h1>
            </div>
            <div className="w-32 lg:w-40 h-32 lg:h-40  rounded-full -mt-12">
                <div className='w-32 lg:w-40 h-32 lg:h-40 border-2 border-[#307bc4] rounded-full'>
                    <Image
                        className='w-full h-full rounded-full'
                        src={publicProfile.profilePicture}
                        width={500}
                        height={300}
                        alt="Tailwind CSS Navbar component"
                    />
                </div>
            </div>

        </div>
    )
}

export default PublicDoctorProfile