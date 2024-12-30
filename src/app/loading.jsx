"use client"
import React from 'react'
import loader from '../../public/loading.svg'
import Image from 'next/image'
import { RotatingLines } from 'react-loader-spinner'

const loading = () => {
  return (
    <div className='h-[600px] flex justify-center items-center'>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default loading