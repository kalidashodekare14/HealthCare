"use client"
import React from 'react'
import image from '../../../public/image/contactImg.jpg'
import { AiOutlineGlobal } from 'react-icons/ai'
import { FaMobileAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'


const ContactSection = () => {

  const position = [51.505, -0.09]

  return (
    <div>
      <div className='bg-[#f5f5f5]'>
        <div className='lg:mx-32 py-5 px-3'>
          <h1 className='font-rubik text-3xl text-center py-10'>Write us a Message!</h1>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 py-10'>
            <div className='flex items-center gap-2 font-rubik'>
              <AiOutlineGlobal className='text-4xl' />
              <div>
                <h3 className='font-bold'>Address</h3>
                <p>16000 Barkers Point Ln</p>
              </div>
            </div>
            <div className='flex items-center gap-2 font-rubik'>
              <FaMobileAlt className='text-4xl' />
              <div>
                <h3 className='font-bold'>Phone</h3>
                <p>+1775 9865 200
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2 font-rubik'>
              <MdEmail className='text-4xl' />
              <div>
                <h3 className='font-bold'>Email</h3>
                <p>healthcare@gmail.com</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center gap-5'>
            <div className='w-full space-y-2'>
              <input className='input input-bordered rounded-sm w-full' type="text" placeholder='Full Name' />
              <input className='input input-bordered rounded-sm w-full' type="text" placeholder='Email' />
              <input className='input input-bordered rounded-sm w-full' type="text" placeholder='Phone number' />
            </div>
            <div className='w-full'>
              <textarea className="textarea textarea-bordered w-full h-[162px]" placeholder="Message"></textarea>
            </div>
          </div>
          <div className='text-center my-10'>
            <button className='btn w-32 rounded-none bg-[#307bc4] text-white'>Submit</button>
          </div>
        </div>
      </div>
      <div>
      </div>

    </div>
  )
}

export default ContactSection