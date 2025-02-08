"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaDollarSign, FaRegHospital } from 'react-icons/fa6';
import { GrCertificate } from 'react-icons/gr';
import { RotatingLines } from 'react-loader-spinner';
import Select from 'react-select';


const DoctorsSection = () => {

    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [selectedSpecialization, setSelectedSpecialization] = useState(null)
    const [doctorSearch, setDoctorSearch] = useState(null)


    const { data: doctors = [], refetch, isLoading: doctorDataLoading } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/doctors/api`)
            return res.data
        }
    })

    const departments = Array.from(
        new Set(doctors.map(res => res?.professional_information?.department))
    )

    const departmentsOption = departments.map(category => ({
        value: category,
        label: category
    }))

    const specialization = Array.from(
        new Set(doctors.map(res => res?.professional_information?.specialization))
    )

    const specializationsOption = specialization.map(specialization => ({
        value: specialization,
        label: specialization
    }))


    const filtering = doctors.filter((doctor => {
        const matchedDepartment = selectedDepartment ? doctor?.professional_information?.department === selectedDepartment.value : true
        const matchedSpecialization = selectedSpecialization ? doctor?.professional_information?.specialization === selectedSpecialization.value : true
        const doctorsMatched = doctorSearch ? (
            doctor.name.toLowerCase().includes(doctorSearch.toLowerCase())
        ) : true
        return (
            matchedDepartment &&
            matchedSpecialization &&
            doctorsMatched
        )
    }))



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
        <div className='lg:mx-10 mx-5'>
            <div className='lg:mx-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-3 border p-3 w-full'>
                <div className='w-full'>
                    <input
                        onChange={(event) => setDoctorSearch(event.target.value)}
                        className='input input-bordered h-[45px] w-full'
                        placeholder='Doctor Search'
                        type="text" />
                </div>
                <div>
                    <Select
                        styles={{
                            control: (base) => ({
                                ...base,
                                height: '45px'
                            })
                        }}
                        placeholder="Department"
                        isClearable={true}
                        defaultValue='Department'
                        className=''
                        options={departmentsOption}
                        onChange={(event) => setSelectedDepartment(event)}
                    />
                </div>
                <div>
                    <Select
                        styles={{
                            control: (base) => ({
                                ...base,
                                height: '45px'
                            })
                        }}
                        placeholder="Specialization"
                        isClearable={true}
                        options={specializationsOption}
                        onChange={(event) => setSelectedSpecialization(event)}
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
                {
                    doctors.length > 0 ? (
                        filtering.map(doctor => (
                            <div className='border space-y-2 p-3 font-rubik' key={doctor._id}>
                                <div className='flex justify-center items-center border-b pb-2'>
                                    {
                                        doctor?.image ? (
                                            <Image className='w-40 h-40 rounded-full' src={doctor.image} width={500} height={300} alt='doctor image' />
                                        ) : (
                                            <Image className='w-40 h-40 rounded-full' src="https://i.ibb.co.com/WcTWxsN/nav-img.png" width={500} height={300} alt='doctor image' />
                                        )
                                    }

                                </div>
                                <div className='space-y-2 border-b pb-2'>
                                    <h1 className='text-xl font-bold'>{doctor.name || "N/A"}</h1>
                                    <div className='flex items-center gap-2'>
                                        <GrCertificate className='text-[15px] text-[#307bc4]' />
                                        <p className='text-[15px]'>{doctor?.professional_information?.qualification || "N/A"}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <FaRegHospital className='text-[15px] text-[#307bc4]' />
                                        <p className='text-[15px]'>{doctor?.professional_information?.hospital_clinic || "N/A"}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <FaDollarSign className='text-[15px] text-[#307bc4]' />
                                        <div className='flex items-center gap-2 text-[15px]'>
                                            <p>
                                                {doctor?.service_details?.service_type || "N/A"}
                                            </p>
                                            <p>
                                                ${doctor?.service_details?.consultation_fee || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center border-b pb-2'>
                                    <div className='grid grid-cols-3 gap-3'>
                                        {
                                            doctor?.service_details?.available_date?.map((date, index) => (
                                                <p className='' key={index}>{new Date(date).toLocaleDateString()}</p>
                                            ))
                                        }
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <p>{doctor?.service_details?.time_and_slots[0].start}</p>
                                        <span>-</span>
                                        <p>{doctor?.service_details?.time_and_slots[0].end}</p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <Link href={`/doctors/${doctor?._id}`}>
                                        <button className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] border-1 hover:border-[#307bc4] text-white w-32'>Profile</button>
                                    </Link>
                                    <Link href={`/appoinment/${doctor?._id}`}>
                                        <button className='btn hover:bg-[#307bc4] bg-white text-[#307bc4]  hover:text-white border-1 w-32 border-[#307bc4]'>Appointment</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Data Available</p>
                    )
                }
            </div>
        </div>
    )
}

export default DoctorsSection