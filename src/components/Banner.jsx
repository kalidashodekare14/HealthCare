"use client"
import Image from 'next/image'
import React from 'react'
import doctor from '../../public/image/doctor.png'
import { ImPlay2 } from "react-icons/im";

const Banner = () => {
    return (
        <div className="bg-gradient-to-r from-[#C5E1F2] to-[#8FCBFF] h-[650px] ">
            <div className="flex items-center lg:h-[700px] h-[500px]">
                {/* left side */}
                <div className='lg:w-[40%] lg:mx-32 lg:space-y-5 space-y-6'>
                    <h1 className="lg:text-[50px] text-4xl font-bold text-[#030202c7] leading-tight">Delivering Excellence in Patient Care</h1>
                    <p className='lg:w-[70%] font-[500] text-[#382d2d]'>At the heart of our mission is an unwavering commitment to providing exceptional care to every patient, every day.</p>
                    <div className='flex items-center gap-2'>
                        <ImPlay2 onClick={() => document.getElementById('my_modal_2').showModal()} className='text-5xl text-[#317bc4] cursor-pointer' />
                        <p className='font-[500]'>See how we work</p>
                    </div>
                </div>
            </div>
            <div>
                <Image className="absolute bottom-0 lg:right-24 right-2 lg:w-[55%]" src={doctor} width={500} height={300} draggable={false} />
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-none">
                    <video 
                    controls
                    autoPlay
                    
                    >
                        <source src='/image/intro_video.mp4' type='video/mp4'></source>
                    </video>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default Banner