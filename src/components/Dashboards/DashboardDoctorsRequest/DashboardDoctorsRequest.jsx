"use client"
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { RotatingLines } from 'react-loader-spinner'
import Swal from 'sweetalert2'


const DashboardDoctorsRequest = () => {

    const [approvedLoading, setApprovedLoading] = useState(false)
    const [rejctLoading, setRejctLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [doctorId, setDoctorId] = useState(null)
    const [doctorQueryData, setDoctorQueryData] = useState([])

    console.log('doctor id', doctorId)
    console.log('check doctor data', doctorQueryData)

    const { data: doctor_request, refetch, isLoading: doctorReqLoading } = useQuery({
        queryKey: ["doctor_request"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors-request/api`)
            return res.data
        }
    })

    useEffect(() => {
        const doctorFind = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors-request/api/doctor-query?id=${doctorId}`)
            setDoctorQueryData(res.data)
        }
        if (doctorId) {
            doctorFind()
        }
    }, [doctorId])

    const handleApproved = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to approve the doctor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setApprovedLoading(true)
                    const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors-request/api/status-approved?id=${id}`)
                    console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Status approved successfuly",
                            icon: "success",
                            draggable: true
                        });
                        refetch()
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setApprovedLoading(false)
                }
            }
        });


    }

    const handleRejected = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to reject the doctor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setRejctLoading(true)
                    const rejectRes = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/doctors-request/api/status-reject?id=${id}`)
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
                    setRejctLoading(false)
                }
            }
        });
    }


    return (
        <div className='bg-[#f6fbf8]'>
            <div className='lg:px-10 px-3'>
                <div className='flex justify-between items-center py-5 font-rubik'>
                    <button className='btn bg-[#307bc4] lg:w-32 text-white rounded-2xl'>Add New</button>
                    <div className='flex items-center gap-3'>
                        <div>
                            {
                                approvedLoading && (
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
                            {
                                rejctLoading && (
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
                <div className=" bg-white">
                    <table className="table font-rubik">
                        {/* head */}
                        <thead>
                            <tr className='text-[15px]'>
                                <th></th>
                                <th>Doctor Id</th>
                                <th>Doctor Name</th>
                                <th>License Number</th>
                                <th>Specialization</th>
                                <th>Status</th>
                                <th>
                                    <div className='flex items-center gap-2'>
                                        <p>Action</p>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(doctor_request) && doctor_request.length > 0 ? (

                                    doctor_request?.map(doctorReq => (
                                        <tr key={doctorReq._id}>
                                            <td>
                                                <div className='flex items-center gap-2'>
                                                    <div className='w-14 h-14 rounded-full'>
                                                        {
                                                            doctorReq?.image ? (
                                                                <Image
                                                                    className='w-full h-full rounded-full'
                                                                    src={`${doctorReq?.image}`}
                                                                    width={500}
                                                                    height={300}
                                                                    alt={`${doctorReq?.name}`}
                                                                />
                                                            ) : (
                                                                <Image
                                                                    className='w-full h-full rounded-full'
                                                                    src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"}
                                                                    width={500}
                                                                    height={300}
                                                                    alt={`${doctorReq?.name}`}
                                                                />
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p>{doctorReq?.patiend_id || "N/A"}</p>
                                            </td>
                                            <td>
                                                <p>{doctorReq?.name || "N/A"}</p>
                                            </td>

                                            <td>
                                                <p>{doctorReq?.professional_information?.license_number || "N/A"}</p>
                                            </td>
                                            <td>
                                                <p>{doctorReq?.professional_information?.specialization || "N/A"}</p>
                                            </td>
                                            <td>
                                                <div className={`${doctorReq?.status === "approved" && "text-[#307bc4] border-[#307bc4]"} ${doctorReq?.status === "pending" && "text-[#c4b530] border-[#c4b530]"} border rounded-full p-2 w-20`}>
                                                    {doctorReq?.status || "N/A"}
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex items-center gap-3 text-2xl'>
                                                    <div onClick={() => handleApproved(doctorReq._id)} className='cursor-pointer border rounded-full p-2 bg-[#307bc4] text-white'>
                                                        <FaCheck />
                                                    </div>
                                                    <div onClick={() => handleRejected(doctorReq._id)} className='cursor-pointer border rounded-full p-2 bg-red-500 text-white'>
                                                        <IoMdClose />
                                                    </div>
                                                    <div className="dropdown dropdown-end">
                                                        <div tabIndex={0} role="button" className=" m-1">
                                                            <CiMenuKebab className='text-2xl' />
                                                        </div>
                                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                            <li onClick={() => {
                                                                onOpenModal()
                                                                setDoctorId(doctorReq._id)
                                                            }}
                                                            className='bg-[#307bc4] text-white'
                                                            >
                                                                <p>Details</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))

                                ) : (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='font-rubik'>No Data Available</td>
                                    </tr>
                                )
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

export default DashboardDoctorsRequest