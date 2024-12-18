import React from 'react'
import logo from '../../public/logo2.png'
import Image from 'next/image'
import { IoCallOutline } from 'react-icons/io5'
import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { IoIosSend, IoIosTime } from 'react-icons/io'
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className=''>
            <footer className="footer bg-[#307bc4] text-base-content p-10 lg:px-32">
                <aside className='space-y-3'>
                    <Image className='w-40' src={logo} width={500} height={300} alt='logo' />
                    <p className='text-white lg:w-[20rem]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut et facere ducimus natus. Suscipit cumque nemo, repudiandae soluta vel debitis.</p>
                    <div className='text-white space-y-2'>
                        <div className='flex items-center gap-2 text-[16px]'>
                            <IoCallOutline />
                            <p>+8801728659852</p>
                        </div>
                        <div className='flex items-center gap-2 text-[16px]'>
                            <FaLocationDot />
                            <p>New York, Us</p>
                        </div>
                        <div className='flex items-center gap-2 text-[16px]'>
                            <MdEmail />
                            <p>healthcare@gmail.com</p>
                        </div>
                    </div>
                </aside>
                <nav className='text-white space-y-1'>
                    <h6 className="font-bold text-xl">Doctors</h6>
                    <a className="link link-hover">Dr. Jon L. Edwards</a>
                    <a className="link link-hover">Dr. George R. Justice</a>
                    <a className="link link-hover">Dr. Keith H. Pierson</a>
                    <a className="link link-hover">Dr. Thomas J. Kidney</a>
                    <a className="link link-hover">Dr. Jamal B. Wills</a>
                </nav>
                <nav className='text-white space-y-1'>
                    <h6 className="font-bold text-xl">Services</h6>
                    <a className="link link-hover">Emergency Services</a>
                    <a className="link link-hover">Outpatient Services</a>
                    <a className="link link-hover">Inpatient Services</a>
                    <a className="link link-hover">Cardiology (Heart Care)</a>
                    <a className="link link-hover">Pulmonology (Lung Care)</a>
                </nav>
                <nav className='text-white space-y-3'>
                    <h6 className="font-bold text-xl">Hospital Hours</h6>
                    <a className="link link-hover flex items-center gap-2">
                        <IoIosTime />
                        <span>Anytime Services</span>
                    </a>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 rounded-full bg-white flex justify-center items-center'>
                            <FaFacebookF className='text-[#307bc4]' />
                        </div>
                        <div className='w-8 h-8 rounded-full bg-white flex justify-center items-center'>
                            <FaLinkedinIn className='text-[#307bc4]' />
                        </div>
                        <div className='w-8 h-8 rounded-full bg-white flex justify-center items-center'>
                            <FaTwitter className='text-[#307bc4]' />
                        </div>
                        <div className='w-8 h-8 rounded-full bg-white flex justify-center items-center'>
                            <FaInstagramSquare className='text-[#307bc4]' />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <p className="text-xl">Newsletter</p>
                        <div className='flex items-center'>
                            <input className='input h-10 rounded-md bg-opacity-0 border-1 border-[#bdbcbc]' placeholder='Enter Email' type="text" />
                            <div className='-ml-5 bg-[#081c57] w-10 h-10 flex justify-center items-center rounded-md'>
                                <IoIosSend className='text-xl' />
                            </div>
                        </div>
                    </div>
                </nav>
            </footer>
            <footer className="footer footer-center bg-[#307bc4] p-4 text-white border-t">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved.</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footer