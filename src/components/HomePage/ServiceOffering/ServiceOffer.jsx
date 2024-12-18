"use client"
import React, { useEffect, useState } from 'react'
import modern from '../../../../public/image/tab_section/modern.jpg'
import success from '../../../../public/image/tab_section/success.jpg'
import certified from '../../../../public/image/tab_section/certified.jpg'
import medical from '../../../../public/image/tab_section/medical.jpg'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa6'
import { GrCertificate, GrTechnology } from "react-icons/gr";
import { GiHospitalCross } from 'react-icons/gi'
import { FaFileMedicalAlt } from 'react-icons/fa'

const ServiceOffer = () => {

    const [activeTab, setActiveTab] = useState("modern_technology")
    console.log(activeTab)


    return (
        <div className='lg:mx-10 mx-3 my-20'>
            <h1 className='text-3xl font-bold'>Service Offerings</h1>
            <div role="tablist" className="font-rubik grid grid-cols-2 lg:grid-cols-4 gap-5 lg:w-[80%] m-auto py-10">
                <a onClick={() => setActiveTab("modern_technology")} role="tab" className={`${activeTab === "modern_technology" ? "bg-[#307bc4] text-white" : "bg-[#f1f7fc]"} flex items-center gap-3 cursor-pointer  px-3 py-4 text-[16px] font-[600] rounded-md`}>
                    <span><GrTechnology className={`${activeTab === "modern_technology" && "text-white"} text-2xl text-[#307bc4]`} /></span>
                    <span>Mordern Technology</span>
                </a>
                <a onClick={() => setActiveTab("success_of_treatment")} role="tab" className={`${activeTab === "success_of_treatment" ? "bg-[#307bc4] text-white" : "bg-[#f1f7fc]"} flex items-center gap-3 cursor-pointer  px-3 py-4 text-[16px] font-[600] rounded-md`}>
                    <span><GiHospitalCross className={`${activeTab === "success_of_treatment" && "text-white"} text-2xl text-[#307bc4]`} /></span>
                    <span>Success of Treatment</span>
                </a>
                <a onClick={() => setActiveTab("certified_doctors")} role="tab" className={`${activeTab === "certified_doctors" ? "bg-[#307bc4] text-white" : "bg-[#f1f7fc]"} flex items-center gap-3 cursor-pointer   px-3 py-4 text-[16px] font-[600] rounded-md`}>
                    <span ><GrCertificate className={`${activeTab === "certified_doctors" && "text-white"} text-2xl text-[#307bc4]`} /></span>
                    <span>Certified Doctors</span>
                </a>
                <a onClick={() => setActiveTab("medical_advice")} role="tab" className={`${activeTab === "medical_advice" ? "bg-[#307bc4] text-white" : "bg-[#f1f7fc]"} flex items-center gap-3 cursor-pointer  px-3 py-4 text-[16px] font-[600] rounded-md`}>
                    <span><FaFileMedicalAlt className={`${activeTab === "medical_advice" && "text-white"} text-2xl text-[#307bc4]`} /></span>
                    <span>Medical Advice</span>
                </a>
            </div>
            {
                activeTab === "modern_technology" && (
                    <div className='font-rubik flex flex-col lg:flex-row justify-between gap-5 items-center border p-3 rounded-md'>
                        <Image className='w-full h-[22rem]' src={modern} width={500} height={300} alt='modern technology' />
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold'>Empowering Tomorrow with Modern Technology</h1>
                            <p className='lg:w-[35rem]'>Modern technology is revolutionizing industries and everyday life, enhancing connectivity, efficiency, and innovation. It opens new opportunities, addressing global challenges and shaping a smarter future.</p>
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
                    <div className='font-rubik flex flex-col lg:flex-row justify-between gap-5   items-center border p-3 rounded-md'>
                        <Image className='w-full h-[22rem]' src={success} width={500} height={300} alt='modern technology' />
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold'>Success of Treatment Pathways to Healing</h1>
                            <p className='lg:w-[35rem]'>The success of treatment is determined by the effectiveness of medical interventions, the patient's response, and ongoing care. With advancements in technology and research, treatments today are more targeted and personalized, leading to higher recovery rates and improved quality of life.</p>
                            <ul className=''>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> Tailoring treatments to individual needs for better outcomes.</li>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> Cutting-edge medical technology enhancing diagnosis and treatment precision.</li>
                            </ul>
                            <button className='btn w-32 bg-[#307bc4] text-white'>Read More</button>
                        </div>
                    </div>
                )
            }
            {
                activeTab === "certified_doctors" && (
                    <div className='font-rubik flex flex-col lg:flex-row justify-between gap-5   items-center border p-3 rounded-md'>
                        <Image className='w-full h-[22rem]' src={certified} width={500} height={300} alt='modern technology' />
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold'>Certified Doctors Experts in Healthcare</h1>
                            <p className='lg:w-[35rem]'>Certified doctors are highly trained medical professionals who have met rigorous education and licensing requirements. Their expertise ensures that patients receive high-quality care based on the latest medical research and best practices.</p>
                            <ul className=''>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> Rigorous medical school education followed by specialized training in their field.</li>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> Certification from recognized medical boards ensures they meet the highest standards.</li>
                            </ul>
                            <button className='btn w-32 bg-[#307bc4] text-white'>Read More</button>
                        </div>
                    </div>
                )
            }
            {
                activeTab === "medical_advice" && (
                    <div className='font-rubik flex flex-col lg:flex-row justify-between gap-5   items-center border p-3 rounded-md'>
                        <Image className='w-full h-[22rem]' src={medical} width={500} height={300} alt='modern technology' />
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold'>Medical Advice Your Path to Better Health</h1>
                            <p className='lg:w-[35rem]'>Medical advice is essential for maintaining health, preventing diseases, and managing medical conditions. Seeking professional guidance ensures that patients make informed decisions about their health, using the latest treatments and preventive measures.</p>
                            <ul className=''>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> Recommendations to avoid health issues, including lifestyle changes and screenings.</li>
                                <li className='flex items-center gap-3'><span><FaCheck /></span> Tailored advice based on individual health needs, conditions, and goals.</li>
                            </ul>
                            <button className='btn w-32 bg-[#307bc4] text-white'>Read More</button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default ServiceOffer