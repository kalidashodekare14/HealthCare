'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating'
import { RotatingLines } from 'react-loader-spinner'

const PublicDoctorProfile = ({ profileId }) => {


    const { data: publicProfile = [], refetch, isLoading: doctorDataLoading } = useQuery({
        queryKey: ["publicProfile", profileId],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/doctors/public_doctor_profile?id=${profileId}`)
            return res.data
        }
    })

    console.log(publicProfile)
    console.log('data loading', doctorDataLoading)

    if (doctorDataLoading) {
        return <div className='h-[600px] flex justify-center items-center'>
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    return (
        <div className='mx-32'>
            <div className='h-32 lg:h-80 bg-no-repeat bg-center bg-cover flex justify-center items-center' style={{ backgroundImage: "url(https://i.postimg.cc/xjX3c21v/profile.jpg)" }}>
                <h1 className='text-4xl text-white font-rubik'>Doctor Profile</h1>
            </div>
            <div>
                <div className="mx-10 flex items-center gap-3 -mt-16">
                    {
                        publicProfile?.image ? (
                            <div className='w-32 lg:w-52 h-32 lg:h-52 border-2 border-[#307bc4] rounded-full'>
                                <Image
                                    className='w-full h-full rounded-full'
                                    src={publicProfile?.image}
                                    width={500}
                                    height={300}
                                    alt="Tailwind CSS Navbar component"
                                />
                            </div>

                        ) : (
                            <div className='w-32 lg:w-52 h-32 lg:h-52 border-2 border-[#307bc4] rounded-full'>
                                <Image
                                    className='w-full h-full rounded-full'
                                    src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"}
                                    width={500}
                                    height={300}
                                    alt="Tailwind CSS Navbar component"
                                />
                            </div>
                        )

                    }
                    <div className='font-rubik space-y-1'>
                        {
                            publicProfile?.name ? (
                                <h1 className='text-[20px] lg:text-3xl'>{publicProfile?.name}</h1>
                            ) : (
                                <h1 className='text-[20px] lg:text-3xl'>No Name</h1>
                            )
                        }

                        {
                            publicProfile?.professional_information?.qualification ? (
                                <p>{publicProfile?.professional_information?.qualification}</p>
                            ) : (
                                <p>No Qualification</p>
                            )
                        }

                    </div>
                </div>
                <div className='my-10'>
                    <div className='border p-5 my-3 font-rubik'>
                        <p>{publicProfile?.bio}</p>
                    </div>
                    <div className='my-10'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            <div className='font-rubik'>
                                <p>Experience</p>
                                <div className='border p-3'>
                                    {
                                        publicProfile?.professional_information?.experience ? (
                                            <p>{publicProfile?.professional_information?.experience}Year</p>
                                        ) : (
                                            <p>No Experience</p>
                                        )
                                    }

                                </div>
                            </div>
                            <div className='font-rubik'>
                                <p>Clinic</p>
                                <div className='border p-3'>
                                    {
                                        publicProfile?.professional_information?.hospital_clinic ? (
                                            <p>{publicProfile?.professional_information?.hospital_clinic}</p>
                                        ) : (
                                            <p>No Clinic</p>
                                        )
                                    }

                                </div>
                            </div>
                            <div className='font-rubik'>
                                <p>Location</p>
                                <div className='border p-3'>
                                    {
                                        publicProfile?.professional_information?.workplace ? (
                                            <p>{publicProfile?.professional_information?.workplace}</p>
                                        ) : (
                                            <p>No Location</p>
                                        )
                                    }

                                </div>
                            </div>
                            <div className='font-rubik'>
                                <p>Availabile Date</p>
                                <div className='border p-3'>
                                    <div className='grid grid-cols-3 gap-2'>
                                        {
                                            publicProfile?.service_details?.available_date ? (
                                                publicProfile?.service_details?.available_date?.map((date, index) => (
                                                    <p className='' key={index}>{new Date(date).toLocaleDateString()}</p>
                                                ))
                                            ) : (
                                                <p>No Available</p>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className='font-rubik'>
                                <p>Time</p>
                                <div className='border p-3'>
                                    {
                                        publicProfile?.service_details ? (
                                            <div className='flex items-center gap-2'>
                                                <p>{publicProfile?.service_details?.time_and_slots[0].start}</p>
                                                <span>-</span>
                                                <p>{publicProfile?.service_details?.time_and_slots[0].end}</p>
                                            </div>
                                        ) : (
                                            <p>No Time</p>
                                        )
                                    }

                                </div>
                            </div>
                            <div className='font-rubik'>
                                <p>Rating</p>
                                <div className='border p-3'>
                                    {
                                        publicProfile?.rating ? (
                                            <div>
                                                <Rating
                                                    style={{ maxWidth: 120 }}
                                                    value={publicProfile?.rating || 0}
                                                    readOnly
                                                />
                                            </div>
                                        ) : (
                                            <p>No Time</p>
                                        )
                                    }

                                </div>
                            </div>
                            <div className='font-rubik'>
                                <p>Phone Number</p>
                                <div className='border p-3'>
                                    {
                                        publicProfile?.phone_number ? (
                                            <p>{publicProfile?.phone_number}</p>
                                        ) : (
                                            <p>No Phone Number</p>
                                        )
                                    }

                                </div>
                            </div>
                            <div className='font-rubik'>
                                <p>Email</p>
                                <div className='border p-3'>
                                    {
                                        publicProfile?.email ? (
                                            <p>{publicProfile?.email}</p>
                                        ) : (
                                            <p>No Email</p>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='border w-[50%] font-rubik'>
                            <h1 className='text-center text-2xl p-2 py-2 border-b'>Specialities</h1>
                            <div className='p-5'>
                                {
                                    publicProfile?.professional_information?.specialization ? (
                                        <p>{publicProfile?.professional_information?.specialization}</p>
                                    ) : (
                                        <p>No Specialization</p>
                                    )
                                }
                            </div>
                        </div>
                        <div className='border w-[50%] font-rubik'>
                            <h1 className='text-center text-2xl py-2 border-b'>Expertises</h1>
                            <div className='p-5'>
                                {
                                    publicProfile?.expertises ? (
                                        <ul className='list-decimal ml-5'>
                                            {
                                                publicProfile?.expertises.map((s, index) => (
                                                    <li key={index}>{s}</li>
                                                ))
                                            }
                                        </ul>
                                    ) : (
                                        <p>No Expertises</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}
export default PublicDoctorProfile