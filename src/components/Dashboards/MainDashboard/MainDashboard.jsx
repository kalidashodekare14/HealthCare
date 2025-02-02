"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FaDollarSign, FaHeartPulse, FaStethoscope, FaWpforms } from 'react-icons/fa6'
import { RotatingLines } from 'react-loader-spinner'
import { AreaChart, BarChart, Bar, Legend, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CCalendar } from '@coreui/react-pro'

const MainDashboard = () => {

    const { data: dataCollection = [], iaLoading: loadingData } = useQuery({
        queryKey: ["dataCollection"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/api`)
            return res.data
        }
    })

    console.log(dataCollection)


    const { data: monthlyData = [], isLoading: monthlyDataLoading } = useQuery({
        queryKey: ["monthlyData"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/api/month-patient-doctor`)
            return res.data
        }
    })


    // TODO
    // const { data: monthlyRevenue } = useQuery({
    //     queryKey: ["monthlyRevenue"],
    //     queryFn: async () => {
    //         const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/api/total-revenues`)
    //         return res.data
    //     }
    // })

    const getMonthName = (monthNumber) => {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUGU", "SEP", "OCT", "NOV", "DEC"]
        return monthNames[monthNumber - 1]
    }


    const allMonth = Array.from({ length: 12 }, (_, index) => index + 1)

    // TODO
    // const formateData2 = allMonth?.map((month, index) => {
    //     const monthName = getMonthName(month)
    //     const matchedRevenue = monthlyRevenue?.totalRevenues?.find(item => item._id.month === month)
    //     return {
    //         name: monthName,
    //         Revenue: matchedRevenue ? matchedRevenue.totalRevenue : 0,
    //     }
    // })



    const formateData = allMonth?.map((month, index) => {
        const monthName = getMonthName(month)
        const matchedPatient = monthlyData.totalPatients?.find(item => item._id.month === month)
        const matchedDoctor = monthlyData.totalDoctors?.find(item => item._id.month === month)
        const matchedAppoinment = monthlyData.totalAppoinments?.find(item => item._id.month === month)

        return {
            name: monthName,
            patients: matchedPatient ? matchedPatient.totalPatient : 0,
            doctors: matchedDoctor ? matchedDoctor.totalDoctor : 0,
            appoinments: matchedAppoinment ? matchedAppoinment.totalAppoinment : 0
        }
    })



    if (loadingData || monthlyDataLoading) {
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
        <div className='bg-[#f6fbf8] px-5'>
            <div className='font-rubik py-5 spae-y-2'>
                <h1 className='text-2xl'>Welcome</h1>
                <p className='text-xl'>Hospital Admin Dashboard</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <div className='flex  justify-between items-center font-rubik bg-gradient-to-r from-[#f89f9d] to-[#f5827f] rounded-2xl text-white p-5'>
                    <div className='space-y-1'>
                        <p>Total Patient</p>
                        {
                            dataCollection?.totalDoctors ? (
                                <p className='text-3xl'>{dataCollection?.totalPatients[0]?.totalPatient || 0}</p>

                            ) : (
                                <p className='text-3xl'>0</p>
                            )
                        }
                    </div>
                    <div className='w-12 h-12 text-3xl rounded-full flex justify-center items-center border'>
                        <FaHeartPulse />
                    </div>
                </div>
                <div className='flex  justify-between items-center font-rubik bg-gradient-to-r from-[#74d68f] to-[#49ca6d] rounded-2xl text-white p-5'>
                    <div className='space-y-1'>
                        <p>Doctors</p>
                        {
                            dataCollection?.totalDoctors ? (
                                <p className='text-3xl'>{dataCollection?.totalDoctors[0]?.totalDoctors || 0}</p>
                            ) : (
                                <p className='text-3xl'>0</p>
                            )
                        }
                    </div>
                    <div className='w-12 h-12 text-3xl rounded-full flex justify-center items-center border'>
                        <FaStethoscope />
                    </div>
                </div>
                <div className='flex  justify-between items-center font-rubik  bg-gradient-to-r from-[#7bbfdb] to-[#4aa7ce] rounded-2xl text-white p-5'>
                    <div className='space-y-1'>
                        <p>Appoinment</p>
                        {
                            dataCollection?.totalAppoinments ? (
                                <p className='text-3xl'>{dataCollection?.totalAppoinments[0]?.totalAppoinments || 0}</p>
                            ) : (
                                <p className='text-3xl'>0</p>
                            )
                        }
                    </div>
                    <div className='w-12 h-12 text-3xl rounded-full flex justify-center items-center border'>
                        <FaWpforms />
                    </div>
                </div>
                <div className='flex  justify-between items-center font-rubik bg-gradient-to-r from-[#c37bdc] to-[#b052d0] rounded-2xl text-white p-5'>
                    <div className='space-y-1'>
                        <p>Hospital Earning</p>
                        {
                            dataCollection?.totalRevenues ? (
                                <p className='text-3xl'>$ {dataCollection?.totalRevenues[0]?.totalRevenues || 0}</p>
                            ) : (
                                <p className='text-3xl'>$ 0</p>
                            )
                        }
                    </div>
                    <div className='w-12 h-12 text-3xl rounded-full flex justify-center items-center border'>
                        <FaDollarSign />
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row  items-center gap-3 my-10'>

                <div className='w-full  bg-white p-5 font-rubik'>
                    <div className='text-[18px] my-5'>
                        <h1>Statistic</h1>
                    </div>
                    <div className='h-[400px]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={400}
                                data={formateData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="patients" stackId="1" stroke="#f7908e" fill="#f68d8b" />
                                <Area type="monotone" dataKey="doctors" stackId="1" stroke="#82ca9d" fill="#63d182" />
                                <Area type="monotone" dataKey="appoinments" stackId="1" stroke="#ffc658" fill="#58aed2" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDashboard