import Image from 'next/image';
import React from 'react';
import errorImage from '../../public/error.gif'
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className='h-[600px] font-rubik flex flex-col-reverse justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-4xl'>Page not found</h1>
                <Link href={"/"}>
                    <button className='btn mt-5 bg-[#307bc4] text-white'>Back to Home</button>
                </Link>
            </div>
            <Image className='w-[30%]' src={errorImage} width={500} height={300} alt='Error Image' />
        </div>
    );
};

export default NotFound;