import Image from 'next/image'
import React from 'react'
import image from '../../../public/image/about_doc.jpg'
import image1 from '../../../public/image/about_doc1.jpg'
import image2 from '../../../public/image/about_doc2.jpg'

const AboutSection = () => {
    return (
        <div className='lg:mx-10 my-5 flex flex-col lg:flex-row items-center justify-between'>
            <div className='relative lg:w-[40%]'>
                <Image className='w-full' src={image} width={500} height={300} alt='doctor'></Image>
                <div className='flex w-[50%]'>
                    <Image className='w-full' src={image1} width={500} height={300} alt='doctor'></Image>
                    <Image className='w-full' src={image2} width={500} height={300} alt='doctor'></Image>
                </div>
                <div className='font-rubik absolute top-1/2 left-[35%] bg-[#307bc4]  text-white w-32 h-32 rounded-full flex flex-col justify-center items-center'>
                    <h1 className='text-4xl'>26+</h1>
                    <p>Experience</p>
                </div>
            </div>
            <div className='lg:w-[50%] space-y-5'>
                <span className='text-[#307bc4] uppercase font-bold font-rubik'>Our About Us</span>
                <h1 className='text-4xl font-bold font-poppins'>More Than 26+ Years About Provide Medical.</h1>
                <p className='font-rubik'>With over 26 years of excellence in the medical field, we are dedicated to providing top-notch healthcare services. Our team of experienced professionals is committed to ensuring the best care for every patient. From advanced medical treatments to personalized care, we prioritize health and well-being above all. Trust us to deliver reliable and compassionate healthcare solutions, backed by decades of expertise and a strong commitment to improving lives.</p>
                <button className='btn font-rubik bg-[#307bc4] text-white'>About More</button>
            </div>
        </div>
    )
}

export default AboutSection