"use client"
import React, { useEffect, useState } from 'react'
import modern from '../../../../public/image/tab_section/modern.jpg'
import success from '../../../../public/image/tab_section/success.jpg'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa6'

const ServiceOffering = () => {

    const [activeTab, setActiveTab] = useState("mordern_technology")
    console.log(activeTab)


    return (
        <div className='mx-10 my-10'>
            <h1 className='text-3xl'>Service Offerings</h1>
            <div role="tablist" className="space-x-3 w-[60%] m-auto py-10">
                <a onClick={() => setActiveTab("modern_technology")} role="tab" className={`${activeTab === "modern_technology" ? "bg-[#307bc4] text-white" : "bg-[#f1f7fc]"} cursor-pointer  px-3 py-4 text-[16px] font-[600] rounded-md`}>Mordern Technology</a>
                <a onClick={() => setActiveTab("success_of_treatment")} role="tab" className={`${activeTab === "success_of_treatment" ? "bg-[#307bc4] text-white" : "bg-[#f1f7fc]"} cursor-pointer  px-3 py-4 text-[16px] font-[600] rounded-md`}>Success of Treatment</a>
                <a onClick={() => setActiveTab("certified_doctors")} role="tab" className={`${activeTab === "certified_doctors" ? "bg-[#307bc4] text-white" : "bg-[#f1f7fc]"} cursor-pointer   px-3 py-4 text-[16px] font-[600] rounded-md`}>Certified Doctors</a>
                <a onClick={() => setActiveTab("medical_advice")} role="tab" className={`${activeTab === "medical_advice" ? "bg-[#307bc4] text-white" : "bg-[#f1f7fc]"} cursor-pointer  px-3 py-4 text-[16px] font-[600] rounded-md`}>Medical Advice</a>
            </div>
            {
                activeTab === "modern_technology" && (
                    <div className='flex justify-between gap-5 items-center border p-3 rounded-md'>
                        <Image className='w-full h-[22rem]' src={modern} width={500} height={300} alt='modern technology' />
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold'>Empowering Tomorrow with Modern Technology</h1>
                            <p className='w-[35rem]'>Modern technology is revolutionizing industries and everyday life, enhancing connectivity, efficiency, and innovation. It opens new opportunities, addressing global challenges and shaping a smarter future.</p>
                            <ul className=''>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> Artificial Intelligence Machines that learn, adapt, and automate processes.</li>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> 5G Technology Faster, more reliable networks for seamless connectivity.</li>
                            </ul>
                            <button className='btn w-32 bg-[#307bc4] text-white'>Read More</button>
                        </div>
                    </div>
                )
            }
            {
                activeTab === "success_of_treatment" && (
                    <div className='flex justify-between gap-5   items-center border p-3 rounded-md'>
                        <Image className='w-full h-[22rem]' src={success} width={500} height={300} alt='modern technology' />
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold'>Success of Treatment Pathways to Healing</h1>
                            <p className='w-[35rem]'>The success of treatment is determined by the effectiveness of medical interventions, the patient's response, and ongoing care. With advancements in technology and research, treatments today are more targeted and personalized, leading to higher recovery rates and improved quality of life.</p>
                            <ul className=''>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> Tailoring treatments to individual needs for better outcomes.</li>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> Cutting-edge medical technology enhancing diagnosis and treatment precision.</li>
                            </ul>
                            <button className='btn w-32 bg-[#307bc4] text-white'>Read More</button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default ServiceOffering