
"use client"
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import './SpecialistDoctor.css'
import doctor1 from '../../../../public/image/meetDoctors/doctor3.jpg'
import doctor2 from '../../../../public/image/meetDoctors/doctor1.jpg'
import Image from 'next/image'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa6'
import { LuInstagram } from "react-icons/lu";
import { FiLinkedin } from "react-icons/fi";

const SpecialistDoctor = () => {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        slidesToScroll: 1,
        speed: 50,
        easing: 'ease-in-out'
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    // const [dots, setdots] = useState([]);


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

    const DoctorCard = ({ doctor }) => (
        <div className='flex-none lg:w-1/4 p-2 group duration-300'>
            <div className='relative h-72 group-hover:bg-[#307bc4] duration-300  flex justify-center items-center'>
                <Image className='w-full h-full opacity-100 group-hover:opacity-0 duration-300' src={doctor.image} width={500} height={300} alt=""></Image>
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
    )


    // data api length
    const dosts = Array.from({ length: doctors.length })

    // index setup
    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi])

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on("select", onSelect)
            onSelect()
        }
    }, [emblaApi, onSelect])


    return (
        <div className='lg:mx-32'>
            <h1 className='text-center text-4xl font-bold'>Meet Our Specialist Doctor</h1>
            <div className='overflow-hidden my-10' ref={emblaRef}>
                <div className='flex transition-transform duration-1000 ease-in-out cursor-pointer'>
                    {
                        doctors.map((doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))
                    }
                </div>
            </div>
            <div className='my-10  hidden lg:flex justify-center items-center gap-5 mb-5'>
                {
                    dosts.map((dot, i) => (
                        <div key={i} onClick={() => emblaApi && emblaApi.scrollTo(i)} className={`${i === selectedIndex ? "w-14 bg-[#307bc4]" : "bg-[#264a61]"} w-10 h-3 rounded-3xl`}></div>
                    ))
                }
            </div>
        </div>
    )
}

export default SpecialistDoctor