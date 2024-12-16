"use client"
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

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
            "image": "https://i.postimg.cc/dQjFMLk6/banner1.jpg"
        },
        {
            "id": "2",
            "header": "Your Trusted Health Partner",
            "title": "Providing Quality Medical Services",
            "description": [
                "Our team of professionals is committed to ensuring your health and safety.",
                "We believe that good health is the foundation of a happy life."
            ],
            "image": "https://i.postimg.cc/PJyn1Rs9/banner2.jpg"
        },
        {
            "id": "3",
            "header": "Experience the Best Care",
            "title": "Caring for Your Health, Always",
            "description": [
                "We offer modern facilities and advanced treatments for every patient.",
                "Your health and satisfaction are our top priorities."
            ],
            "image": "https://i.postimg.cc/prRtht7K/image-1.png"
        }
    ]


    return (
        <Swiper
            navigation={true}
            modules={[Navigation]}
        >

            {
                doctors.map((doctor) => (
                    <SwiperSlide key={doctor.id}>
                        <div style={{ backgroundImage: `url(${doctor.image})` }} className='bg-no-repeat bg-top bg-cover w-full h-[650px] font-poppins'>
                            <div className='pt-[14%] pl-[20%] space-y-5'>
                                <p className='text-[#307bc4] font-bold'>{doctor.header}</p>
                                <p className='text-4xl w-[20rem]'>{doctor.title}</p>
                                <p className='w-[29rem]'>{doctor.description}</p>
                                <div className='space-x-5'>
                                    <button className='btn bg-[#307bc4] hover:bg-white hover:text-[#307bc4] text-white border-0 w-32'>About Us</button>
                                    <button className='btn hover:bg-[#307bc4] bg-white text-[#307bc4]  hover:text-white border-0 w-32'>Our Services</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default Banner