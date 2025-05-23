"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { RotatingLines } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import './PatientsDashboard'

const PatientsDashboard = () => {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [ispatientLoading, setIsPatientLoading] = useState(false)
    const [patientId, setPatientId] = useState(null)
    const [patientQueryData, setPatientQueryData] = useState([])
    const [phoneValue, setPhoneValue] = useState(null)

    // patient data
    const { data: patientsData = [], refetch, isLoading: patientLoading } = useQuery({
        queryKey: ["patientsData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/patients/api`)
            return res.data
        }
    })


    // patient edit data
    useEffect(() => {
        const patientFind = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/patients/api/patient-query?id=${patientId}`)
            setPatientQueryData(res.data)
        }
        if (patientId) {
            patientFind()
        }
    }, [patientId])


    if (patientLoading) {
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

    // patient edit system
    const handleEditPatient = (id) => {
    }
    // patient block system
    const handleBlogPatient = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to block this patient?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, block it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsPatientLoading(true)
                    const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/patients/api/patient-block?id=${id}`)
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Blocked!",
                            text: "Your patient has been blocked.",
                            icon: "success"
                        });
                        refetch()
                    }

                } catch (error) {
                    console.log(error)
                } finally {
                    setIsPatientLoading(false)
                }
            }
        });
    }
    // patient remove system 
    const handleRemovePatient = async (id) => {
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
                    setIsPatientLoading(true)
                    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/patients/api/patient-delete?id=${id}`)
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
                    setIsPatientLoading(false)
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
                                ispatientLoading && (
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
                        <thead>
                            <tr className='text-[15px]'>
                                <th></th>
                                <th>ID</th>
                                <th>Patient Name</th>
                                <th>Health Condition</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patientsData.length < 1 ? (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Data is currently unavailable.</td>
                                    </tr>
                                ) : (
                                    patientsData.map(patient => (
                                        <tr key={patient._id}>
                                            <th>
                                                {
                                                    patient?.image ? (
                                                        <Image
                                                            className='w-14 h-14 rounded-full'
                                                            src={patient?.image}
                                                            width={500}
                                                            height={300}
                                                            alt='doctor picture'
                                                        />
                                                    ) : (
                                                        <Image
                                                            className='w-14 h-14 rounded-full'
                                                            src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"}
                                                            width={500}
                                                            height={300}
                                                            alt='doctor picture'
                                                        />
                                                    )
                                                }

                                            </th>
                                            <td>{patient?.patiend_id || "N/A"}</td>
                                            <td>{patient?.name || "N/A"}</td>
                                            <td>{patient?.health_condition || "N/A"}</td>
                                            <td>{patient?.phone_number || "N/A"}</td>
                                            <td>{patient?.email || "N/A"}</td>
                                            <td>
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} role="button" className=" m-1">
                                                        <CiMenuKebab className='text-2xl' />
                                                    </div>
                                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow space-y-3">
                                                        <li onClick={() => {
                                                            onOpenModal()
                                                            setPatientId(patient._id)
                                                        }}><p className='bg-green-400 text-white'>Edit</p></li>
                                                        <li onClick={() => handleBlogPatient(patient?._id)}><p className='bg-yellow-500 text-white'>Block</p></li>
                                                        <li onClick={() => handleRemovePatient(patient?._id)}><p className='bg-red-500 text-white'>Delete</p></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                            {/* {
                               
                            } */}

                        </tbody>
                    </table>
                    <Modal open={open} onClose={onCloseModal} center>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='rounded-full'>
                                {
                                    patientQueryData?.image ? (
                                        <Image className='rounded-full w-32 h-32' src={patientQueryData?.image} width={500} height={300} alt='' />
                                    ) : (
                                        <Image className='rounded-full w-32 h-32' src={"https://i.ibb.co.com/WcTWxsN/nav-img.png"} width={500} height={300} alt='' />
                                    )
                                }
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 font-rubik'>
                                <div>
                                    <label htmlFor="">Name:</label>
                                    <div className='border p-3'>
                                        <p>{patientQueryData?.name || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Email:</label>
                                    <div className='border p-3'>
                                        <p>{patientQueryData?.email || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Phone Number:</label>
                                    <div className='border p-3'>
                                        <p>{patientQueryData?.phone_number || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Gender:</label>
                                    <div className='border p-3'>
                                        <p>{patientQueryData?.gender || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Date Of Birth:</label>
                                    <div className='border p-3'>
                                        <p>{patientQueryData?.date_of_birth || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Current Address:</label>
                                    <div className='border p-3'>
                                        <p>{patientQueryData?.current_address || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Blood group:</label>
                                    <div className='border p-3'>
                                        <p>{patientQueryData?.blood_group || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Health condition:</label>
                                    <div className='border p-3'>
                                        <p>{patientQueryData?.health_condition || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Health condition:</label>
                                    <div className='border p-3'>
                                        {
                                            patientQueryData?.chronic_diseases_history ? (
                                                patientQueryData?.chronic_diseases_history.map((diseases, index) => (
                                                    <p key={index}>{diseases?.value}</p>
                                                ))
                                            ) : (
                                                <p>N/A</p>
                                            )
                                        }
                                        { }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div >
    )
}

export default PatientsDashboard