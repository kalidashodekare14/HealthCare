"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FaDollarSign, FaHeartPulse, FaStethoscope, FaWpforms } from 'react-icons/fa6'
import { RotatingLines } from 'react-loader-spinner'
import { AreaChart, BarChart, Bar, Legend, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const data2 = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


const MainDashboard = () => {

    const { data: dataCollection = [], iaLoading: loadingData } = useQuery({
        queryKey: ["dataCollection"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/dashboard/api`)
            return res.data
        }
    })

    console.log(dataCollection)

    if (loadingData) {
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
                                <p className='text-3xl'>{dataCollection?.totalDoctors[0]?.totalDoctors}</p>
                            ) : (
                                <p>0</p>
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
                                <p className='text-3xl'>{dataCollection?.totalPatients[0]?.totalPatient}</p>
                            ) : (
                                <p>0</p>
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
                        <p className='text-3xl'>748k</p>
                    </div>
                    <div className='w-12 h-12 text-3xl rounded-full flex justify-center items-center border'>
                        <FaWpforms />
                    </div>
                </div>
                <div className='flex  justify-between items-center font-rubik bg-gradient-to-r from-[#c37bdc] to-[#b052d0] rounded-2xl text-white p-5'>
                    <div className='space-y-1'>
                        <p>Hospital Earning</p>
                        <p className='text-3xl'>3048k</p>
                    </div>
                    <div className='w-12 h-12 text-3xl rounded-full flex justify-center items-center border'>
                        <FaDollarSign />
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row  items-center gap-3 my-10'>
                <div className='lg:w-[600px] bg-white font-rubik p-5'>
                    <div className='flex justify-between items-center text-[18px] my-3'>
                        <h1>Revenue</h1>
                        <h1>$4521</h1>
                    </div>
                    <div className='h-[400px]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='w-full  bg-white p-5 font-rubik'>
                    <div className='text-[18px] my-5'>
                        <h1>Patient Statistic</h1>
                    </div>
                    <div className='h-[400px]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={400}
                                data={data2}
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
                                <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDashboard