import React from 'react'
import img1 from '../../../public/image/success/img1.jpg'
import img2 from '../../../public/image/success/img2.jpg'
import img3 from '../../../public/image/success/img3.jpg'
import Image from 'next/image'
import Link from 'next/link'

const SuccessWork = () => {
  return (
    <div className='lg:mx-10'>
      <h1 className='text-3xl'>Our Completed Works</h1>
      <div className='m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10'>
        <div className='group'>
          <Image className='relative z-10 w-full h-72' src={img1} width={500} height={300} alt='success work 1' />
          <div className='relative z-20 w-80 p-3 bg-white group-hover:bg-[#307bc4] duration-500 shadow-xl -mt-10 hover: m-auto space-y-2'>
            <h1 className='text-xl font-bold group-hover:text-white duration-500'>Pioneering Patient Care</h1>
            <p className='text-[#000000bd] group-hover:text-white duration-500'>Advancing healthcare with cutting-edge solutions, compassionate care.</p>
          </div>
        </div>
        <div className='group'>
          <Image className='relative z-10 w-full h-72' src={img2} width={500} height={300} alt='success work 1' />
          <div className='relative z-20 w-80 p-3 bg-white group-hover:bg-[#307bc4] duration-500 shadow-xl -mt-10 m-auto space-y-2'>
            <h1 className='text-xl font-bold group-hover:text-white duration-500'>Elevating Hospital Excellence</h1>
            <p className='text-[#000000bd] group-hover:text-white duration-500'>Achieving success through innovative healthcare delivery, quality service.</p>
          </div>
        </div>
        <div className='group'>
          <Image className='relative z-10 w-full h-72' src={img3} width={500} height={300} alt='success work 1' />
          <div className='relative z-20 w-80 p-3 bg-white group-hover:bg-[#307bc4] duration-500 shadow-xl -mt-10 m-auto space-y-2'>
            <Link className='hover:text-[#307bc4]' href="#">
              <h1 className='text-xl font-bold group-hover:text-white duration-500'>Empowering Healthcare Success</h1>
            </Link>
            <p className='text-[#000000bd] group-hover:text-white duration-500'>Streamlining hospital operations and enhancing patient outcomes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessWork