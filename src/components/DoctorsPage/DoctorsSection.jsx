import Image from 'next/image';
import React from 'react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa6';
import { FiLinkedin } from 'react-icons/fi';
import { LuInstagram } from 'react-icons/lu';

const DoctorsSection = () => {

    const doctors = [
        {
            id: 1,
            name: "Dr. Norma Pedric",
            role: "Neurologist",
            image: "https://i.postimg.cc/HLFk6tMF/doctor3.jpg",
            subImage: "https://i.postimg.cc/HLFk6tMF/doctor3.jpg"
        },
        {
            id: 2,
            name: "Dr. Kay L. Revis",
            role: "Cardiologist",
            image: "https://i.postimg.cc/7Zs624ZH/doctor2.jpg",
            subImage: "https://i.postimg.cc/7Zs624ZH/doctor2.jpg"
        },
        {
            id: 3,
            name: "Dr. Edwin M. Hudson",
            role: "Cardiologist",
            image: "https://i.postimg.cc/4x9csn5C/portrait-man-wearing-medical-gown-holding-clipboard.jpg",
            subImage: "https://i.postimg.cc/4x9csn5C/portrait-man-wearing-medical-gown-holding-clipboard.jpg"
        },
        {
            id: 4,
            name: "Dr. Stacy L. Stegall",
            role: "Cardiologist",
            image: "https://i.postimg.cc/X7F2DNCJ/doctors.jpg",
            subImage: "https://i.postimg.cc/X7F2DNCJ/doctors.jpg"
        },
        {
            id: 5,
            name: "Dr. Willie J. Bergan",
            role: "Cardiologist",
            image: "https://i.postimg.cc/5y8wp0RW/doctorss.jpg",
            subImage: "https://i.postimg.cc/5y8wp0RW/doctorss.jpg"
        },
        {
            id: 6,
            name: "Dr. Ruth J. Young",
            role: "Cardiologist",
            image: "https://i.postimg.cc/Kc7fnpSk/doc.jpg",
            subImage: "https://i.postimg.cc/Kc7fnpSk/doc.jpg"
        },
        {
            id: 7,
            name: "Dr. Jay S. Burling",
            role: "Cardiologist",
            image: "https://i.postimg.cc/y83STWgQ/doct.avif",
            subImage: "https://i.postimg.cc/y83STWgQ/doct.avif"
        },
        {
            id: 8,
            name: "Dr. Jay S. Burling",
            role: "Cardiologist",
            image: "https://i.postimg.cc/y83STWgQ/doct.avif",
            subImage: "https://i.postimg.cc/y83STWgQ/doct.avif"
        },
        // Add more doctors as needed
    ];

    return (
        <div className='mx-10'>
            <h1 className='text-4xl text-center my-10 font-bold font-poppins'>Meet Our Specialist Doctor</h1>
            <div className='grid grid-cols-4 my-10'>
                {
                    doctors.map(doctor => (
                        <div key={doctor.id} className='font-rubik w-full p-2 group duration-300'>
                            <div className='relative h-[300px] group-hover:bg-[#307bc4] duration-300  flex justify-center items-center rounded-2xl'>
                                <Image className='w-full h-full opacity-100 group-hover:opacity-0 duration-300 rounded-2xl' src={doctor.image} width={500} height={300} alt=""></Image>
                                <div style={{ backgroundImage: `url(${doctor.subImage})` }} className={`absolute top-5 opacity-0 group-hover:opacity-100 duration-700 group-hover:rounded-full bg-no-repeat bg-top bg-cover w-36 h-36`}></div>
                                <div className='absolute bottom-0 group-hover:bottom-5 duration-300 opacity-0 group-hover:opacity-100 text-white flex flex-col justify-center items-center gap-1'>
                                    <h1 className='font-bold text-2xl'>{doctor.name}</h1>
                                    <p className='font-[400]'>{doctor.role}</p>
                                    <div className='flex items-center gap-2'>
                                        <div className='flex justify-center items-center w-8 h-8 rounded-full text-[#307bc4] bg-white'>
                                            <FaFacebookF />
                                        </div>
                                        <div className='flex justify-center items-center w-8 h-8 rounded-full text-[#307bc4] bg-white'>
                                            <LuInstagram />
                                        </div>
                                        <div className='flex justify-center items-center w-8 h-8 rounded-full text-[#307bc4] bg-white'>
                                            <FiLinkedin />
                                        </div>
                                        <div className='flex justify-center items-center w-8 h-8 rounded-full text-[#307bc4] bg-white'>
                                            <FaLinkedinIn />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorsSection