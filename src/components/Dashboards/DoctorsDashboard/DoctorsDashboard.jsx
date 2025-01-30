"use client"
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { RotatingLines } from 'react-loader-spinner'
import Swal from 'sweetalert2';

const DoctorsDashboard = () => {

    const [rejectLoading, setRejectLoading] = useState(false)
    const [doctorId, setDoctorId] = useState(null)
    const [doctorQueryData, setDoctorQueryData] = useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [isDoctorLoading, setIsDoctorLoading] = useState(false)

    console.log('check doctor find', doctorQueryData)
    console.log('doctor id check', doctorId)

    const { data: doctorsData = [], refetch, isLoading: doctorsLoading } = useQuery({
        queryKey: ["doctorsData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors/api`)
            return res.data
        }
    })

    // doctor query data
    useEffect(() => {
        const doctorFind = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors/api/doctor-query?id=${doctorId}`)
            setDoctorQueryData(res.data)
        }
        if (doctorId) {
            doctorFind()
        }
    }, [doctorId])


    if (doctorsLoading) {
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


    const handleBlock = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to block this doctor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsDoctorLoading(true)
                    const rejectRes = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors/api/status-block?id=${id}`)
                    console.log(rejectRes.data)
                    if (rejectRes.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Status reject successfuly",
                            icon: "success",
                            draggable: true
                        });
                        refetch()
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsDoctorLoading(false)
                }
            }
        });

    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to Delete this doctor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsDoctorLoading(true)
                    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors/api/doctor-delete?id=${id}`)
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your doctor has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    }

                } catch (error) {
                    console.log(error)
                } finally {
                    setIsDoctorLoading(false)
                }
            }
        });
    }



    return (
        <div className='bg-[#f6fbf8]'>
            <div className='lg:px-10 px-3'>
                <div className='flex justify-between items-center py-5 font-rubik'>
                    <button className='btn bg-[#307bc4] lg:w-32 text-white rounded-2xl'>Add New</button>
                    <div className='flex items-center gap-5'>
                        <div>
                            {
                                isDoctorLoading && (
                                    <RotatingLines
                                        visible={true}
                                        height="50"
                                        width="50"
                                        color="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        ariaLabel="rotating-lines-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                )
                            }
                        </div>
                        <div className='relative flex items-center'>
                            <input className='input border border-[#000]' type="text" />
                            <FaSearch className='absolute right-2 text-2xl cursor-pointer' />
                        </div>
                    </div>

                </div>
                <div className="overflow-x-auto  bg-white">
                    <table className="table font-rubik">
                        {/* head */}
                        <thead>
                            <tr className='text-[15px]'>
                                <th>Doctor Info</th>
                                <th>Specialization</th>
                                <th>Experience</th>
                                <th>Available Date</th>
                                <th>Time and slots</th>
                                <th>Contact Us</th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctorsData.map(doctor => (
                                    <tr key={doctor._id}>
                                        <td>
                                            <div className='flex items-center gap-3'>
                                                <div>
                                                    {
                                                        doctor?.image ? (
                                                            <Image
                                                                className='w-14 h-14 rounded-full'
                                                                src={doctor?.image}
                                                                width={500}
                                                                height={300}
                                                                alt='doctor picture'
                                                            />
                                                        ) : (
                                                            <Image
                                                                className='w-14 h-14 rounded-full'
                                                                src={`https://i.ibb.co.com/WcTWxsN/nav-img.png`}
                                                                width={500}
                                                                height={300}
                                                                alt='doctor picture'
                                                            />
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <p>{doctor?.name || "N/A"}</p>
                                                    <p>{doctor?.patiend_id || "N/A"}</p>
                                                </div>
                                            </div>

                                        </td>
                                        <td>{doctor?.professional_information?.specialization || "N/A"}</td>
                                        <td>{doctor?.professional_information?.experience || "N/A"} Year</td>
                                        <td>
                                            {
                                                doctor?.service_details?.available_date ? (
                                                    <div className='space-y-2'>
                                                        {
                                                            doctor?.service_details?.available_date?.map((date, index) => (
                                                                <p className='' key={index}>{new Date(date).toLocaleDateString()}</p>
                                                            ))
                                                        }
                                                    </div>
                                                ) : (
                                                    <p>N/A</p>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                doctor?.service_details?.time_and_slots[0] ? (
                                                    <div className='flex items-center gap-2'>
                                                        <p>{doctor?.service_details?.time_and_slots[0].start}</p>
                                                        <span>-</span>
                                                        <p>{doctor?.service_details?.time_and_slots[0].end}</p>
                                                    </div>
                                                ) : (
                                                    <p>N/A</p>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <div>
                                                <p>{doctor?.email}</p>
                                                <p>{doctor?.phone_number}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className=" m-1">
                                                    <CiMenuKebab className='text-2xl' />
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 space-y-3 rounded-box z-[1] w-52 p-2 shadow">
                                                    <li onClick={() => {
                                                        onOpenModal()
                                                        setDoctorId(doctor._id)
                                                    }}
                                                    className='bg-green-500 text-white'
                                                    >
                                                        <p>Details</p>
                                                    </li>
                                                    <li onClick={() => handleBlock(doctor?._id)} className='bg-yellow-500 text-white'>
                                                        <p>Block</p>
                                                    </li>
                                                    <li onClick={() => handleDelete(doctor?._id)} className='bg-red-500 text-white'>
                                                        <p>Delete</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                    <Modal open={open} onClose={onCloseModal} center>
                        <div>
                            <div className='flex justify-center items-center rounded-full'>
                                {
                                    doctorQueryData?.image ? (
                                        <Image className='rounded-full w-32 h-32' src={doctorQueryData?.image} width={500} height={300} alt='' />
                                    ) : (
                                        <Image className='rounded-full w-32 h-32' src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"} width={500} height={300} alt='' />
                                    )
                                }
                            </div>
                            <div className='border-y mt-5 font-rubik'>
                                <h1 className='text-center text-[18px] py-2'>Personal Information</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 font-rubik'>
                                    <div>
                                        <label htmlFor="">Name:</label>
                                        <div className='border p-3'>
                                            <p>{doctorQueryData?.name || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Email:</label>
                                        <div className='border p-3'>
                                            <p>{doctorQueryData?.email || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Phone Number:</label>
                                        <div className='border p-3'>
                                            <p>{doctorQueryData?.phone_number || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Gender:</label>
                                        <div className='border p-3'>
                                            <p>{doctorQueryData?.gender || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Date Of Birth:</label>
                                        <div className='border p-3'>
                                            <p>{doctorQueryData?.date_of_birth || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Current Address:</label>
                                        <div className='border p-3'>
                                            <p>{doctorQueryData?.current_address || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='font-rubik'>
                            <div className='border-y mt-5 font-rubik'>
                                <h1 className='text-center text-[18px] py-2'>Professional Information</h1>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-3'>
                                <div>
                                    <label htmlFor="">License Number:</label>
                                    <div className='border p-3'>
                                        <p>{doctorQueryData?.professional_information?.license_number || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Specialization:</label>
                                    <div className='border p-3'>
                                        <p>{doctorQueryData?.professional_information?.specialization || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Experience:</label>
                                    <div className='border p-3'>
                                        <p>{doctorQueryData?.professional_information?.experience || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Location:</label>
                                    <div className='border p-3'>
                                        <p>{doctorQueryData?.professional_information?.location || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Qualification:</label>
                                    <div className='border p-3'>
                                        <p>{doctorQueryData?.professional_information?.qualification || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Hospital Clinic:</label>
                                    <div className='border p-3'>
                                        <p>{doctorQueryData?.professional_information?.hospital_clinic || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Department:</label>
                                    <div className='border p-3'>
                                        <p>{doctorQueryData?.professional_information?.department || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='font-rubik'>
                            <div className='border-y mt-5 font-rubik'>
                                <h1 className='text-center text-[18px] py-2'>Service Details</h1>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-3'>
                                <div>
                                    <label htmlFor="">Doctor fee:</label>
                                    <div className='border p-3'>
                                        <p>{doctorQueryData?.service_details?.consultation_fee || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Service type:</label>
                                    <div className='border p-3'>
                                        <p>{doctorQueryData?.service_details?.service_type || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Avaiable date:</label>
                                    <div className='border p-3 grid grid-cols-2 gap-3'>

                                        {
                                            doctorQueryData?.service_details?.available_date?.map((date, index) => (
                                                <p key={index}>{new Date(date).toLocaleDateString() || 'N/A'}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Time and slots:</label>
                                    <div className='border p-3 flex items-center gap-2'>
                                        <p>{doctorQueryData?.service_details?.time_and_slots[0]?.start || "N/A"}</p>
                                        <span>-</span>
                                        <p>{doctorQueryData?.service_details?.time_and_slots[0]?.end || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default DoctorsDashboard