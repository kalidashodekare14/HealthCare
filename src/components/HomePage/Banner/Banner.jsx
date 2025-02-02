"use client"
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import SwiperButton from './SwiperButton';

const Banner = () => {

    const doctors = [
        {
            "id": "1",
            "header": "Welcome to our Medical Care Center",
            "title": "We Take Care Our Patients Health",
            "description": [
                "I realized that becoming a doctor, I can only help a small community.",
                "But by becoming a doctor, I can help my whole country."
            ],
            "image": "https://i.postimg.cc/RZYkdnr4/Group-2.png"
        },
        {
            "id": "2",
            "header": "Your Trusted Health Partner",
            "title": "Providing Quality Medical Services",
            "description": [
                "Our team of professionals is committed to ensuring your health and safety.",
                "We believe that good health is the foundation of a happy life."
            ],
            "image": "https://i.postimg.cc/441jM0C8/Group-3.png"
        },
        {
            "id": "3",
            "header": "Experience the Best Care",
            "title": "Caring for Your Health, Always",
            "description": [
                "We offer modern facilities and advanced treatments for every patient.",
                "Your health and satisfaction are our top priorities."
            ],
            "image": "https://i.postimg.cc/WpBL0ZvV/Group-4.png"
        }
    ]


    return (
        <Swiper
            // navigation={true}
            modules={[Navigation]}
            className='relative'
        >

            {
                doctors.map((doctor) => (
                    <SwiperSlide key={doctor.id}>
                        <div style={{ backgroundImage: `url(${doctor.image})` }} className='bg-no-repeat bg-top bg-cover w-full lg:h-[650px] h-[500px]'>
                            <div className='lg:pt-[14%] pt-[30%] px-10 lg:pl-[20%] space-y-5'>
                                {/* <p className='text-[#2d72b8] font-bold'>{doctor.header}</p> */}
                                <h1 className='lg:text-5xl text-3xl lg:w-[30rem] font-poppins font-bold text-white'>{doctor.title}</h1>
                                <p className='lg:w-[29rem] font-rubik text-[#ffffffc5]'>{doctor.description}</p>
                                <div className='space-x-5'>
                                    <button className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] text-white border-0 w-32'>About Us</button>
                                    <button className='btn hover:bg-[#307bc4] bg-white text-[#307bc4]  hover:text-white border-0 w-32'>Our Services</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
            <SwiperButton />
        </Swiper>
    )
}

export default Banner